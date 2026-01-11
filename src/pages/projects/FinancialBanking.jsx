import { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// Simple syntax highlighter for Java code
const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments
    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting
    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|HashMap|Optional|Stream|Exception|RuntimeException)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function FinancialBanking({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Parse code into sections
  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentCode = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      // Check for section headers (lines with ═ and ✦)
      if (line.includes('═══════') && lines[i + 1]?.includes('✦')) {
        // Save previous section
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentCode.join('\n')
          })
          currentCode = []
        }
        // Extract section title (next line after ═══════)
        currentSection = lines[i + 1].replace(/^\/\/\s*✦\s*/, '').trim()
        i += 2 // Skip the closing ═══════ line
        continue
      }

      // Skip separator lines
      if (line.includes('═══════')) {
        continue
      }

      // Add code line to current section
      if (currentSection) {
        currentCode.push(line)
      }
    }

    // Save last section
    if (currentSection && currentCode.length > 0) {
      sections.push({
        title: currentSection,
        code: currentCode.join('\n')
      })
    }

    return sections
  }

  const bankingTopics = [
    {
      id: 1,
      name: 'Payment Systems',
      icon: '💳',
      color: '#10b981',
      description: 'ACH, wire transfers, and payment rails',
      content: {
        explanation: 'Payment systems facilitate money movement between accounts and institutions. ACH (Automated Clearing House) processes batch transactions overnight. Wire transfers provide same-day settlement. Real-Time Payments (RTP) enable instant transfers. Payment rails are infrastructure networks like FedWire, ACH, and card networks. Clearing houses act as intermediaries. NACHA governs ACH network rules and standards.',
        keyPoints: [
          'ACH - batch processing, next-day settlement, low cost, direct deposit/bill pay',
          'Wire transfers - same-day settlement, high value, real-time, irreversible',
          'RTP (Real-Time Payments) - instant settlement, 24/7/365 availability',
          'Payment rails - infrastructure (FedWire, ACH, SWIFT, card networks)',
          'Clearing houses - intermediaries that settle transactions between banks',
          'NACHA - ACH network operator, sets rules and standards'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ ACH Payment Processing & Batch Management
// ═══════════════════════════════════════════════════════════════════════════
@Service
@Transactional
public class AchPaymentService {

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private AchBatchRepository achBatchRepository;

  public AchPayment initiateAchPayment(AchPaymentRequest request) {
    // Validate accounts
    Account debitAccount = accountRepository.findByAccountNumber(
      request.getDebitAccountNumber()
    ).orElseThrow(() -> new AccountNotFoundException());

    Account creditAccount = accountRepository.findByAccountNumber(
      request.getCreditAccountNumber()
    ).orElseThrow(() -> new AccountNotFoundException());

    // Check balance for debit
    if (debitAccount.getBalance().compareTo(request.getAmount()) < 0) {
      throw new InsufficientFundsException();
    }

    // Create ACH payment entry
    AchPayment payment = new AchPayment();
    payment.setDebitAccount(debitAccount);
    payment.setCreditAccount(creditAccount);
    payment.setAmount(request.getAmount());
    payment.setEffectiveDate(request.getEffectiveDate());
    payment.setSecCode(request.getSecCode());  // PPD, CCD, WEB
    payment.setStatus(AchStatus.PENDING);
    payment.setCreatedAt(LocalDateTime.now());

    // Add to ACH batch for processing
    AchBatch batch = achBatchRepository.findTodaysBatch()
      .orElseGet(() -> createNewBatch());

    batch.addPayment(payment);
    achBatchRepository.save(batch);

    return payment;
  }

  @Scheduled(cron = "0 0 18 * * ?")  // 6 PM daily
  public void processAchBatch() {
    AchBatch batch = achBatchRepository.findTodaysBatch()
      .orElseThrow();

    log.info("Processing ACH batch: {} with {} payments",
      batch.getId(), batch.getPayments().size());

    // Calculate batch totals
    BigDecimal totalDebits = batch.getPayments().stream()
      .map(AchPayment::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    // Create NACHA file
    String nachaFile = createNachaFile(batch);

    // Submit to ACH network
    submitToAchNetwork(nachaFile);

    // Update batch status
    batch.setStatus(AchBatchStatus.SUBMITTED);
    batch.setSubmittedAt(LocalDateTime.now());
    achBatchRepository.save(batch);
  }

  private String createNachaFile(AchBatch batch) {
    StringBuilder nacha = new StringBuilder();

    // File Header Record (Type 1)
    nacha.append("101 ")  // Record Type
      .append("123456789 ")  // Immediate Destination (Routing)
      .append("987654321 ")  // Immediate Origin (Company ID)
      .append(LocalDate.now().format(DateTimeFormatter.ofPattern("yyMMdd")))
      .append("1800")  // File Creation Time
      .append("A")  // File ID Modifier
      .append("094")  // Record Size
      .append("10")  // Blocking Factor
      .append("1")  // Format Code
      .append("YOUR BANK NAME")
      .append("YOUR COMPANY NAME")
      .append("\\n");

    // Batch Header Record (Type 5)
    nacha.append("5200")  // Service Class Code (200 = Mixed)
      .append("YOUR COMPANY")
      .append("                    ")  // Discretionary Data
      .append("1234567890")  // Company ID
      .append("PPD")  // SEC Code
      .append("PAYROLL   ")  // Entry Description
      .append(LocalDate.now().format(DateTimeFormatter.ofPattern("yyMMdd")))
      .append(batch.getEffectiveDate().format(DateTimeFormatter.ofPattern("yyMMdd")))
      .append("   ")  // Settlement Date
      .append("1")  // Originator Status Code
      .append("12345678")  // Originating DFI
      .append(String.format("%07d", batch.getId()))
      .append("\\n");

    // Entry Detail Records (Type 6)
    for (AchPayment payment : batch.getPayments()) {
      nacha.append("6")  // Record Type
        .append("22")  // Transaction Code (22 = Checking Credit)
        .append(payment.getCreditAccount().getRoutingNumber())
        .append(payment.getCreditAccount().getAccountNumber())
        .append(String.format("%010d", payment.getAmount().multiply(
          BigDecimal.valueOf(100)).longValue()))
        .append(String.format("%015d", payment.getCreditAccount().getId()))
        .append(payment.getCreditAccount().getOwnerName())
        .append("  ")  // Discretionary
        .append("0")  // Addenda Record Indicator
        .append("12345678")  // Trace Number
        .append("\\n");
    }

    // Batch Control Record (Type 8)
    // File Control Record (Type 9)

    return nacha.toString();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Wire Transfer & Fedwire Integration
// ═══════════════════════════════════════════════════════════════════════════
@Service
@Transactional
public class WireTransferService {

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private FedwireGateway fedwireGateway;

  public WireTransfer initiateWireTransfer(WireTransferRequest request) {
    // Validate and lock accounts
    Account senderAccount = accountRepository.findByAccountNumberWithLock(
      request.getSenderAccount()
    ).orElseThrow();

    // Check balance
    if (senderAccount.getBalance().compareTo(request.getAmount()) < 0) {
      throw new InsufficientFundsException();
    }

    // Debit sender immediately
    senderAccount.debit(request.getAmount());
    accountRepository.save(senderAccount);

    // Create wire transfer
    WireTransfer wire = new WireTransfer();
    wire.setSenderAccount(senderAccount);
    wire.setBeneficiaryName(request.getBeneficiaryName());
    wire.setBeneficiaryAccount(request.getBeneficiaryAccount());
    wire.setBeneficiaryBank(request.getBeneficiaryBank());
    wire.setAmount(request.getAmount());
    wire.setReference(request.getReference());
    wire.setStatus(WireStatus.PENDING);

    // Submit to Fedwire
    FedwireMessage message = createFedwireMessage(wire);
    FedwireResponse response = fedwireGateway.send(message);

    if (response.isSuccess()) {
      wire.setStatus(WireStatus.SENT);
      wire.setFedwireReference(response.getReference());
      wire.setSentAt(LocalDateTime.now());
    } else {
      // Reversal if failed
      senderAccount.credit(request.getAmount());
      accountRepository.save(senderAccount);
      wire.setStatus(WireStatus.FAILED);
      wire.setErrorMessage(response.getError());
    }

    return wire;
  }

  private FedwireMessage createFedwireMessage(WireTransfer wire) {
    return FedwireMessage.builder()
      .messageType("1000")  // Customer Transfer
      .senderAba(wire.getSenderAccount().getRoutingNumber())
      .receiverAba(wire.getBeneficiaryBank())
      .amount(wire.getAmount())
      .senderReference(wire.getReference())
      .beneficiaryName(wire.getBeneficiaryName())
      .beneficiaryAccount(wire.getBeneficiaryAccount())
      .build();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Real-Time Payments (RTP) Network
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class RtpService {

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private RtpNetworkClient rtpClient;

  public RtpPayment sendRtpPayment(RtpPaymentRequest request) {
    // Real-time validation
    Account senderAccount = accountRepository.findByAccountNumber(
      request.getSenderAccount()
    ).orElseThrow();

    if (senderAccount.getBalance().compareTo(request.getAmount()) < 0) {
      throw new InsufficientFundsException();
    }

    // Create RTP message (ISO 20022 format)
    RtpMessage message = RtpMessage.builder()
      .messageId(UUID.randomUUID().toString())
      .creationDateTime(LocalDateTime.now())
      .numberOfTransactions(1)
      .debtor(senderAccount.getOwner())
      .debtorAccount(senderAccount.getAccountNumber())
      .debtorAgent(senderAccount.getRoutingNumber())
      .creditor(request.getCreditorName())
      .creditorAccount(request.getCreditorAccount())
      .creditorAgent(request.getCreditorRoutingNumber())
      .amount(request.getAmount())
      .currency("USD")
      .endToEndId(request.getReference())
      .build();

    // Send to RTP network (instant processing)
    RtpResponse response = rtpClient.sendPayment(message);

    if (response.isAccepted()) {
      // Immediate debit
      senderAccount.debit(request.getAmount());
      accountRepository.save(senderAccount);

      return RtpPayment.successful(message, response);
    } else {
      return RtpPayment.rejected(message, response.getRejectReason());
    }
  }

  // Request for Payment (RfP)
  public RtpRequest requestPayment(RtpRequestRequest request) {
    RtpMessage requestMessage = RtpMessage.builder()
      .messageType("REQUEST")
      .creditor(request.getRequestorName())
      .creditorAccount(request.getRequestorAccount())
      .debtor(request.getPayerName())
      .amount(request.getAmount())
      .expiryDateTime(LocalDateTime.now().plusHours(24))
      .requestDescription(request.getDescription())
      .build();

    return rtpClient.sendRequest(requestMessage);
  }
}`
      }
    },
    {
      id: 2,
      name: 'Transaction Processing',
      icon: '🔄',
      color: '#3b82f6',
      description: 'ACID properties and transaction lifecycle',
      content: {
        explanation: 'Transaction processing ensures data integrity through ACID properties. Atomicity guarantees all-or-nothing execution. Consistency maintains database rules and constraints. Isolation prevents concurrent transaction interference. Durability ensures committed data persists. Two-phase commit coordinates distributed transactions. Idempotency allows safe retry of operations. Transaction lifecycle includes initiation, validation, execution, and settlement.',
        keyPoints: [
          'ACID properties - Atomicity, Consistency, Isolation, Durability guarantees',
          'Two-phase commit - prepare phase, commit phase for distributed transactions',
          'Idempotency - same operation produces same result, safe retries',
          'Transaction lifecycle - initiate, validate, authorize, execute, settle',
          'Settlement - final transfer of funds, irrevocable',
          'Compensation transactions - reverse failed operations in distributed systems'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ ACID Transaction & Isolation Levels
// ═══════════════════════════════════════════════════════════════════════════
@Service
@Transactional(isolation = Isolation.SERIALIZABLE)
public class TransactionService {

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private TransactionRepository transactionRepository;

  // Atomicity: All operations succeed or all fail
  public Transaction transfer(TransferRequest request) {
    Account fromAccount = accountRepository.findByIdWithLock(
      request.getFromAccountId()
    ).orElseThrow();

    Account toAccount = accountRepository.findByIdWithLock(
      request.getToAccountId()
    ).orElseThrow();

    // Consistency: Validate business rules
    if (fromAccount.getBalance().compareTo(request.getAmount()) < 0) {
      throw new InsufficientFundsException();
    }

    if (!fromAccount.isActive() || !toAccount.isActive()) {
      throw new AccountNotActiveException();
    }

    // Create transaction record
    Transaction transaction = new Transaction();
    transaction.setFromAccount(fromAccount);
    transaction.setToAccount(toAccount);
    transaction.setAmount(request.getAmount());
    transaction.setStatus(TransactionStatus.PENDING);
    transaction.setCreatedAt(LocalDateTime.now());

    try {
      // Execute transfer
      fromAccount.debit(request.getAmount());
      toAccount.credit(request.getAmount());

      // Save all changes
      accountRepository.save(fromAccount);
      accountRepository.save(toAccount);

      transaction.setStatus(TransactionStatus.COMPLETED);
      transaction.setCompletedAt(LocalDateTime.now());

      // Durability: Transaction committed to database
      return transactionRepository.save(transaction);

    } catch (Exception e) {
      // Atomicity: Rollback on failure
      transaction.setStatus(TransactionStatus.FAILED);
      transaction.setErrorMessage(e.getMessage());
      transactionRepository.save(transaction);
      throw new TransactionFailedException(e);
    }
  }
}

// Isolation Levels
@Service
public class IsolationDemoService {

  // READ_UNCOMMITTED: Can read uncommitted changes (dirty read)
  @Transactional(isolation = Isolation.READ_UNCOMMITTED)
  public Account readUncommitted(Long accountId) {
    return accountRepository.findById(accountId).orElseThrow();
  }

  // READ_COMMITTED: Only reads committed data (prevents dirty reads)
  @Transactional(isolation = Isolation.READ_COMMITTED)
  public Account readCommitted(Long accountId) {
    return accountRepository.findById(accountId).orElseThrow();
  }

  // REPEATABLE_READ: Same query returns same result (prevents non-repeatable reads)
  @Transactional(isolation = Isolation.REPEATABLE_READ)
  public List<Account> repeatableRead() {
    List<Account> first = accountRepository.findAll();
    // Another transaction can't modify these records
    List<Account> second = accountRepository.findAll();
    return first;  // Same as second
  }

  // SERIALIZABLE: Full isolation (prevents phantom reads)
  @Transactional(isolation = Isolation.SERIALIZABLE)
  public List<Account> serializable() {
    return accountRepository.findAll();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Two-Phase Commit Protocol
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class TwoPhaseCommitService {

  @Autowired
  private List<ParticipantService> participants;

  public void executeDistributedTransaction(DistributedTxRequest request) {
    String transactionId = UUID.randomUUID().toString();
    Map<ParticipantService, Boolean> prepareResults = new HashMap<>();

    try {
      // PHASE 1: PREPARE
      log.info("Phase 1: Prepare - Transaction: {}", transactionId);

      for (ParticipantService participant : participants) {
        boolean prepared = participant.prepare(transactionId, request);
        prepareResults.put(participant, prepared);

        if (!prepared) {
          log.error("Participant {} failed to prepare", participant.getName());
          rollbackAll(transactionId, prepareResults.keySet());
          throw new PrepareFailedException();
        }
      }

      // PHASE 2: COMMIT
      log.info("Phase 2: Commit - Transaction: {}", transactionId);

      for (ParticipantService participant : participants) {
        boolean committed = participant.commit(transactionId);

        if (!committed) {
          log.error("Participant {} failed to commit", participant.getName());
          // At this point, some may have committed - need recovery
          initiateRecovery(transactionId, participants);
          throw new CommitFailedException();
        }
      }

      log.info("Transaction {} completed successfully", transactionId);

    } catch (Exception e) {
      log.error("Distributed transaction failed", e);
      rollbackAll(transactionId, prepareResults.keySet());
      throw new DistributedTransactionException(e);
    }
  }

  private void rollbackAll(String txId, Set<ParticipantService> participants) {
    for (ParticipantService participant : participants) {
      try {
        participant.rollback(txId);
      } catch (Exception e) {
        log.error("Rollback failed for participant: {}", participant.getName(), e);
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Idempotency & Transaction Lifecycle
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class IdempotentTransactionService {

  @Autowired
  private TransactionRepository transactionRepository;

  @Autowired
  private IdempotencyKeyRepository idempotencyKeyRepository;

  @Transactional
  public Transaction processPayment(PaymentRequest request) {
    String idempotencyKey = request.getIdempotencyKey();

    // Check if already processed
    Optional<IdempotencyRecord> existing =
      idempotencyKeyRepository.findByKey(idempotencyKey);

    if (existing.isPresent()) {
      log.info("Duplicate request detected: {}", idempotencyKey);
      return transactionRepository.findById(existing.get().getTransactionId())
        .orElseThrow();
    }

    // Process transaction
    Transaction transaction = executePayment(request);

    // Store idempotency key
    IdempotencyRecord record = new IdempotencyRecord();
    record.setKey(idempotencyKey);
    record.setTransactionId(transaction.getId());
    record.setCreatedAt(LocalDateTime.now());
    record.setExpiresAt(LocalDateTime.now().plusHours(24));
    idempotencyKeyRepository.save(record);

    return transaction;
  }

  @Scheduled(cron = "0 0 * * * ?")  // Hourly
  public void cleanupExpiredKeys() {
    idempotencyKeyRepository.deleteExpired(LocalDateTime.now());
  }
}

// Transaction Lifecycle
@Service
public class TransactionLifecycleService {

  public TransactionResult processTransaction(TransactionRequest request) {
    String transactionId = UUID.randomUUID().toString();

    // 1. INITIATE
    Transaction tx = initiateTransaction(transactionId, request);

    // 2. VALIDATE
    ValidationResult validation = validateTransaction(tx);
    if (!validation.isValid()) {
      tx.setStatus(TransactionStatus.REJECTED);
      tx.setRejectReason(validation.getReason());
      return TransactionResult.rejected(tx);
    }

    // 3. AUTHORIZE
    AuthorizationResult auth = authorizeTransaction(tx);
    if (!auth.isAuthorized()) {
      tx.setStatus(TransactionStatus.DECLINED);
      return TransactionResult.declined(tx);
    }

    // 4. EXECUTE
    try {
      executeTransaction(tx);
      tx.setStatus(TransactionStatus.EXECUTED);
    } catch (Exception e) {
      tx.setStatus(TransactionStatus.FAILED);
      return TransactionResult.failed(tx, e);
    }

    // 5. SETTLE
    settleTransaction(tx);
    tx.setStatus(TransactionStatus.SETTLED);

    return TransactionResult.success(tx);
  }

  private Transaction initiateTransaction(String id, TransactionRequest request) {
    Transaction tx = new Transaction();
    tx.setId(id);
    tx.setType(request.getType());
    tx.setAmount(request.getAmount());
    tx.setFromAccount(request.getFromAccount());
    tx.setToAccount(request.getToAccount());
    tx.setStatus(TransactionStatus.INITIATED);
    tx.setInitiatedAt(LocalDateTime.now());
    return transactionRepository.save(tx);
  }

  private void settleTransaction(Transaction tx) {
    // Final, irrevocable transfer of funds
    Account fromAccount = accountRepository.findById(tx.getFromAccountId())
      .orElseThrow();
    Account toAccount = accountRepository.findById(tx.getToAccountId())
      .orElseThrow();

    fromAccount.debit(tx.getAmount());
    toAccount.credit(tx.getAmount());

    accountRepository.save(fromAccount);
    accountRepository.save(toAccount);

    tx.setSettledAt(LocalDateTime.now());
    transactionRepository.save(tx);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Compensation Transactions (Saga Pattern)
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class CompensatingTransactionService {

  public void executeWithCompensation(TransactionRequest request) {
    List<CompensationAction> compensations = new ArrayList<>();

    try {
      // Step 1: Reserve funds
      reserveFunds(request);
      compensations.add(() -> releaseFunds(request));

      // Step 2: Validate account
      validateAccount(request);
      // No compensation needed

      // Step 3: Execute transfer
      executeTransfer(request);
      compensations.add(() -> reverseTransfer(request));

      // Step 4: Update balances
      updateBalances(request);
      compensations.add(() -> revertBalances(request));

      // Success - clear compensations
      compensations.clear();

    } catch (Exception e) {
      log.error("Transaction failed, executing compensations", e);

      // Execute compensations in reverse order
      Collections.reverse(compensations);
      for (CompensationAction compensation : compensations) {
        try {
          compensation.execute();
        } catch (Exception ex) {
          log.error("Compensation failed", ex);
        }
      }

      throw new TransactionFailedException(e);
    }
  }

  @FunctionalInterface
  interface CompensationAction {
    void execute();
  }
}`
      }
    },
    {
      id: 3,
      name: 'Banking Domain',
      icon: '🏦',
      color: '#f59e0b',
      description: 'Core banking concepts and ledgers',
      content: {
        explanation: 'Banking domain encompasses account management, ledger systems, and financial operations. Account types include checking, savings, money market, and loan accounts. Ledger systems use double-entry bookkeeping where every transaction has equal debits and credits. Balance calculation aggregates all transactions. Reconciliation ensures internal records match external statements. General Ledger (GL) tracks all financial transactions.',
        keyPoints: [
          'Account types - checking, savings, money market, CD, loan accounts',
          'Ledger systems - general ledger, sub-ledgers, chart of accounts',
          'Double-entry bookkeeping - every debit has equal credit, balanced books',
          'Balance calculation - running balance, available vs. ledger balance',
          'Reconciliation - match internal records with bank statements',
          'Chart of accounts - structured list of GL accounts, asset/liability/equity'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Account Types & Inheritance
// ═══════════════════════════════════════════════════════════════════════════
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Account {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String accountNumber;
  private BigDecimal balance;
  private LocalDateTime openedDate;
  private AccountStatus status;

  @ManyToOne
  private Customer owner;

  public abstract String getAccountType();
  public abstract BigDecimal getInterestRate();
}

@Entity
public class CheckingAccount extends Account {

  private BigDecimal overdraftLimit;
  private BigDecimal monthlyFee;

  @Override
  public String getAccountType() {
    return "CHECKING";
  }

  @Override
  public BigDecimal getInterestRate() {
    return BigDecimal.ZERO;  // No interest
  }
}

@Entity
public class SavingsAccount extends Account {

  private BigDecimal interestRate;
  private Integer withdrawalLimit;  // Reg D: 6 per month

  @Override
  public String getAccountType() {
    return "SAVINGS";
  }

  @Override
  public BigDecimal getInterestRate() {
    return interestRate;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Double-Entry Ledger System
// ═══════════════════════════════════════════════════════════════════════════
@Service
@Transactional
public class LedgerService {

  @Autowired
  private LedgerEntryRepository ledgerRepository;

  public void recordTransaction(Transaction transaction) {
    // Every transaction creates two entries: debit and credit

    // Debit entry (source account)
    LedgerEntry debit = new LedgerEntry();
    debit.setTransactionId(transaction.getId());
    debit.setAccountId(transaction.getFromAccountId());
    debit.setEntryType(EntryType.DEBIT);
    debit.setAmount(transaction.getAmount());
    debit.setBalance(calculateNewBalance(transaction.getFromAccountId(), debit));
    debit.setTimestamp(LocalDateTime.now());
    ledgerRepository.save(debit);

    // Credit entry (destination account)
    LedgerEntry credit = new LedgerEntry();
    credit.setTransactionId(transaction.getId());
    credit.setAccountId(transaction.getToAccountId());
    credit.setEntryType(EntryType.CREDIT);
    credit.setAmount(transaction.getAmount());
    credit.setBalance(calculateNewBalance(transaction.getToAccountId(), credit));
    credit.setTimestamp(LocalDateTime.now());
    ledgerRepository.save(credit);

    // Verify double-entry balance
    verifyDoubleEntry(transaction.getId());
  }

  private void verifyDoubleEntry(String transactionId) {
    List<LedgerEntry> entries = ledgerRepository.findByTransactionId(transactionId);

    BigDecimal totalDebits = entries.stream()
      .filter(e -> e.getEntryType() == EntryType.DEBIT)
      .map(LedgerEntry::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    BigDecimal totalCredits = entries.stream()
      .filter(e -> e.getEntryType() == EntryType.CREDIT)
      .map(LedgerEntry::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    if (totalDebits.compareTo(totalCredits) != 0) {
      throw new UnbalancedLedgerException(
        "Debits and credits don't match: " + totalDebits + " vs " + totalCredits
      );
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Balance Calculation Methods
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class BalanceService {

  @Autowired
  private LedgerEntryRepository ledgerRepository;

  // Ledger balance - all posted transactions
  public BigDecimal getLedgerBalance(Long accountId) {
    List<LedgerEntry> entries = ledgerRepository.findByAccountId(accountId);

    BigDecimal credits = entries.stream()
      .filter(e -> e.getEntryType() == EntryType.CREDIT)
      .map(LedgerEntry::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    BigDecimal debits = entries.stream()
      .filter(e -> e.getEntryType() == EntryType.DEBIT)
      .map(LedgerEntry::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    return credits.subtract(debits);
  }

  // Available balance - ledger balance minus holds
  public BigDecimal getAvailableBalance(Long accountId) {
    BigDecimal ledgerBalance = getLedgerBalance(accountId);

    BigDecimal totalHolds = holdRepository.findActiveByAccountId(accountId)
      .stream()
      .map(Hold::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    return ledgerBalance.subtract(totalHolds);
  }

  // Running balance with pending transactions
  public BigDecimal getRunningBalance(Long accountId) {
    BigDecimal ledgerBalance = getLedgerBalance(accountId);

    BigDecimal pendingDebits = transactionRepository
      .findPendingByAccountId(accountId)
      .stream()
      .filter(t -> t.getFromAccountId().equals(accountId))
      .map(Transaction::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    BigDecimal pendingCredits = transactionRepository
      .findPendingByAccountId(accountId)
      .stream()
      .filter(t -> t.getToAccountId().equals(accountId))
      .map(Transaction::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    return ledgerBalance.add(pendingCredits).subtract(pendingDebits);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Reconciliation & Chart of Accounts
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class ReconciliationService {

  @Autowired
  private LedgerEntryRepository ledgerRepository;

  @Autowired
  private BankStatementRepository statementRepository;

  public ReconciliationReport reconcile(Long accountId, LocalDate statementDate) {
    // Get internal ledger entries
    List<LedgerEntry> ledgerEntries = ledgerRepository
      .findByAccountIdAndDate(accountId, statementDate);

    BigDecimal ledgerBalance = ledgerEntries.stream()
      .map(this::entryAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    // Get bank statement
    BankStatement statement = statementRepository
      .findByAccountIdAndDate(accountId, statementDate)
      .orElseThrow();

    BigDecimal statementBalance = statement.getEndingBalance();

    ReconciliationReport report = new ReconciliationReport();
    report.setAccountId(accountId);
    report.setReconciliationDate(statementDate);
    report.setLedgerBalance(ledgerBalance);
    report.setStatementBalance(statementBalance);

    if (ledgerBalance.compareTo(statementBalance) == 0) {
      report.setStatus(ReconciliationStatus.BALANCED);
    } else {
      report.setStatus(ReconciliationStatus.UNBALANCED);
      report.setDiscrepancy(ledgerBalance.subtract(statementBalance));

      // Find unmatched transactions
      List<LedgerEntry> unmatched = findUnmatchedTransactions(
        ledgerEntries,
        statement.getTransactions()
      );
      report.setUnmatchedEntries(unmatched);
    }

    return report;
  }

  private BigDecimal entryAmount(LedgerEntry entry) {
    return entry.getEntryType() == EntryType.CREDIT
      ? entry.getAmount()
      : entry.getAmount().negate();
  }
}

// Chart of Accounts
@Entity
public class GeneralLedgerAccount {

  @Id
  private String accountCode;  // e.g., "1000", "2000", "3000"

  private String accountName;

  @Enumerated(EnumType.STRING)
  private AccountCategory category;  // ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE

  private String description;
  private boolean active;

  public enum AccountCategory {
    ASSET,      // 1000-1999
    LIABILITY,  // 2000-2999
    EQUITY,     // 3000-3999
    REVENUE,    // 4000-4999
    EXPENSE     // 5000-5999
  }
}

@Service
public class GeneralLedgerService {

  @Autowired
  private GeneralLedgerAccountRepository glAccountRepository;

  @Autowired
  private JournalEntryRepository journalEntryRepository;

  public void recordJournalEntry(JournalEntryRequest request) {
    // Validate balanced entry
    BigDecimal totalDebits = request.getDebits().stream()
      .map(DebitEntry::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    BigDecimal totalCredits = request.getCredits().stream()
      .map(CreditEntry::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    if (totalDebits.compareTo(totalCredits) != 0) {
      throw new UnbalancedJournalEntryException();
    }

    // Create journal entry
    JournalEntry entry = new JournalEntry();
    entry.setEntryDate(request.getDate());
    entry.setDescription(request.getDescription());

    // Add debit entries
    for (DebitEntry debit : request.getDebits()) {
      JournalLine line = new JournalLine();
      line.setGlAccount(glAccountRepository.findById(debit.getAccountCode())
        .orElseThrow());
      line.setDebitAmount(debit.getAmount());
      line.setCreditAmount(BigDecimal.ZERO);
      entry.addLine(line);
    }

    // Add credit entries
    for (CreditEntry credit : request.getCredits()) {
      JournalLine line = new JournalLine();
      line.setGlAccount(glAccountRepository.findById(credit.getAccountCode())
        .orElseThrow());
      line.setDebitAmount(BigDecimal.ZERO);
      line.setCreditAmount(credit.getAmount());
      entry.addLine(line);
    }

    journalEntryRepository.save(entry);
  }

  // Example: Record deposit
  public void recordDeposit(Long accountId, BigDecimal amount) {
    JournalEntryRequest entry = new JournalEntryRequest();

    // Debit: Cash (Asset increases)
    entry.addDebit("1001", amount);  // Cash account

    // Credit: Customer Deposit Liability (Liability increases)
    entry.addCredit("2001", amount);  // Customer deposits

    recordJournalEntry(entry);
  }
}`
      }
    },
    {
      id: 4,
      name: 'Settlement & Clearing',
      icon: '⚖️',
      color: '#8b5cf6',
      description: 'Payment clearing and settlement',
      content: {
        explanation: 'Settlement and clearing are distinct phases in payment processing. Clearing is the process of transmitting, reconciling, and confirming payment instructions. Settlement is the actual transfer of funds. Clearing cycles vary by payment type (real-time, same-day, next-day). Netting reduces settlement volume by offsetting obligations. Bilateral netting occurs between two parties, multilateral among many. Payment finality determines when settlement becomes irrevocable.',
        keyPoints: [
          'Clearing process - transmit instructions, validate, reconcile, confirm',
          'Settlement cycles - real-time, T+0 (same-day), T+1 (next-day), T+2',
          'Netting - bilateral (two parties), multilateral (multiple parties)',
          'Gross settlement - settle each transaction individually (RTGS)',
          'Payment finality - when settlement becomes irrevocable and unconditional',
          'Settlement risk - risk that counterparty fails to settle'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Clearing Process & Cycles
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class ClearingService {

  @Autowired
  private PaymentRepository paymentRepository;

  @Autowired
  private ClearingHouseClient clearingHouse;

  @Scheduled(cron = "0 0 9,15 * * ?")  // 9 AM and 3 PM
  public void processClearingCycle() {
    LocalDate businessDate = LocalDate.now();
    log.info("Starting clearing cycle for {}", businessDate);

    // Phase 1: Gather payments for clearing
    List<Payment> paymentsToCleanr = paymentRepository
      .findPendingClearing(businessDate);

    // Phase 2: Create clearing batch
    ClearingBatch batch = new ClearingBatch();
    batch.setBusinessDate(businessDate);
    batch.setClearingCycle(getCurrentCycle());

    for (Payment payment : paymentsToCleanr) {
      ClearingItem item = new ClearingItem();
      item.setPaymentId(payment.getId());
      item.setSenderBank(payment.getSenderBankCode());
      item.setReceiverBank(payment.getReceiverBankCode());
      item.setAmount(payment.getAmount());
      batch.addItem(item);
    }

    // Phase 3: Submit to clearing house
    ClearingResponse response = clearingHouse.submitBatch(batch);

    // Phase 4: Process clearing results
    for (ClearingResult result : response.getResults()) {
      Payment payment = paymentRepository.findById(result.getPaymentId())
        .orElseThrow();

      if (result.isCleared()) {
        payment.setStatus(PaymentStatus.CLEARED);
        payment.setClearedAt(LocalDateTime.now());
      } else {
        payment.setStatus(PaymentStatus.CLEARING_FAILED);
        payment.setRejectReason(result.getRejectReason());
      }

      paymentRepository.save(payment);
    }

    log.info("Clearing cycle completed: {} payments processed",
      paymentsToCleanr.size());
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Gross & Net Settlement
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class SettlementService {

  @Autowired
  private AccountRepository accountRepository;

  @Autowired
  private SettlementRepository settlementRepository;

  // Gross Settlement - settle each payment individually
  @Transactional
  public void grossSettle(Payment payment) {
    Account senderAccount = accountRepository
      .findByBankCodeAndAccountType(
        payment.getSenderBankCode(),
        AccountType.SETTLEMENT
      ).orElseThrow();

    Account receiverAccount = accountRepository
      .findByBankCodeAndAccountType(
        payment.getReceiverBankCode(),
        AccountType.SETTLEMENT
      ).orElseThrow();

    // Check sender has sufficient balance
    if (senderAccount.getBalance().compareTo(payment.getAmount()) < 0) {
      throw new InsufficientSettlementFundsException();
    }

    // Execute settlement
    senderAccount.debit(payment.getAmount());
    receiverAccount.credit(payment.getAmount());

    accountRepository.save(senderAccount);
    accountRepository.save(receiverAccount);

    // Record settlement
    Settlement settlement = new Settlement();
    settlement.setPaymentId(payment.getId());
    settlement.setAmount(payment.getAmount());
    settlement.setSettlementType(SettlementType.GROSS);
    settlement.setSettledAt(LocalDateTime.now());
    settlement.setStatus(SettlementStatus.FINAL);
    settlementRepository.save(settlement);

    // Update payment status
    payment.setStatus(PaymentStatus.SETTLED);
    payment.setSettledAt(LocalDateTime.now());
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Bilateral & Multilateral Netting
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class BilateralNettingService {

  public NettingResult calculateBilateralNetting(
      String bankA,
      String bankB,
      LocalDate settleDate) {

    // Get all payments between two banks
    List<Payment> aToB = paymentRepository
      .findByRouting(bankA, bankB, settleDate);

    List<Payment> bToA = paymentRepository
      .findByRouting(bankB, bankA, settleDate);

    // Calculate gross amounts
    BigDecimal aToBTotal = aToB.stream()
      .map(Payment::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    BigDecimal bToATotal = bToA.stream()
      .map(Payment::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    // Calculate net position
    BigDecimal netAmount = aToBTotal.subtract(bToATotal);
    String netDebtor = netAmount.compareTo(BigDecimal.ZERO) > 0 ? bankA : bankB;
    String netCreditor = netAmount.compareTo(BigDecimal.ZERO) > 0 ? bankB : bankA;

    NettingResult result = new NettingResult();
    result.setBankA(bankA);
    result.setBankB(bankB);
    result.setGrossAmountAtoB(aToBTotal);
    result.setGrossAmountBtoA(bToATotal);
    result.setNetAmount(netAmount.abs());
    result.setNetDebtor(netDebtor);
    result.setNetCreditor(netCreditor);
    result.setTransactionCount(aToB.size() + bToA.size());

    return result;
  }

  @Transactional
  public void settleBilateralNetting(NettingResult netting) {
    // Only settle net amount instead of all individual payments
    Account debtorAccount = accountRepository
      .findSettlementAccount(netting.getNetDebtor())
      .orElseThrow();

    Account creditorAccount = accountRepository
      .findSettlementAccount(netting.getNetCreditor())
      .orElseThrow();

    debtorAccount.debit(netting.getNetAmount());
    creditorAccount.credit(netting.getNetAmount());

    accountRepository.save(debtorAccount);
    accountRepository.save(creditorAccount);

    log.info("Bilateral netting settled: {} -> {} amount: {}",
      netting.getNetDebtor(),
      netting.getNetCreditor(),
      netting.getNetAmount());
  }
}

// Multilateral Netting
@Service
public class MultilateralNettingService {

  public MultilateralNettingResult calculateMultilateralNetting(
      LocalDate settleDate) {

    List<Payment> allPayments = paymentRepository
      .findBySettlementDate(settleDate);

    Map<String, BigDecimal> netPositions = new HashMap<>();

    // Calculate net position for each bank
    for (Payment payment : allPayments) {
      // Debit sender
      netPositions.merge(
        payment.getSenderBankCode(),
        payment.getAmount().negate(),
        BigDecimal::add
      );

      // Credit receiver
      netPositions.merge(
        payment.getReceiverBankCode(),
        payment.getAmount(),
        BigDecimal::add
      );
    }

    // Separate debtors and creditors
    List<NetPosition> debtors = new ArrayList<>();
    List<NetPosition> creditors = new ArrayList<>();

    for (Map.Entry<String, BigDecimal> entry : netPositions.entrySet()) {
      NetPosition position = new NetPosition(
        entry.getKey(),
        entry.getValue()
      );

      if (entry.getValue().compareTo(BigDecimal.ZERO) < 0) {
        debtors.add(position);
      } else if (entry.getValue().compareTo(BigDecimal.ZERO) > 0) {
        creditors.add(position);
      }
    }

    MultilateralNettingResult result = new MultilateralNettingResult();
    result.setSettlementDate(settleDate);
    result.setDebtors(debtors);
    result.setCreditors(creditors);
    result.setTotalTransactions(allPayments.size());

    // Calculate total gross vs net
    BigDecimal grossAmount = allPayments.stream()
      .map(Payment::getAmount)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    BigDecimal netAmount = debtors.stream()
      .map(NetPosition::getAmount)
      .map(BigDecimal::abs)
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    result.setGrossAmount(grossAmount);
    result.setNetAmount(netAmount);
    result.setNettingEfficiency(
      BigDecimal.ONE.subtract(netAmount.divide(grossAmount, 4, RoundingMode.HALF_UP))
        .multiply(BigDecimal.valueOf(100))
    );

    return result;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Settlement Finality & Reversibility
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class SettlementFinalityService {

  @Transactional
  public void finalizeSettlement(String settlementId) {
    Settlement settlement = settlementRepository.findById(settlementId)
      .orElseThrow();

    // Verify settlement conditions
    if (settlement.getStatus() != SettlementStatus.PENDING) {
      throw new InvalidSettlementStateException();
    }

    // Check finality window
    LocalDateTime finalityTime = LocalDateTime.now();
    if (finalityTime.isBefore(settlement.getFinalityWindow())) {
      throw new FinalityWindowNotReachedException();
    }

    // Mark as final (irrevocable)
    settlement.setStatus(SettlementStatus.FINAL);
    settlement.setFinalizedAt(finalityTime);
    settlementRepository.save(settlement);

    // Update all related payments
    List<Payment> payments = paymentRepository
      .findBySettlementId(settlementId);

    for (Payment payment : payments) {
      payment.setStatus(PaymentStatus.FINAL);
      payment.setFinalizedAt(finalityTime);
    }

    paymentRepository.saveAll(payments);

    log.info("Settlement {} finalized at {}", settlementId, finalityTime);
  }

  // Check if payment can be reversed
  public boolean isReversible(String paymentId) {
    Payment payment = paymentRepository.findById(paymentId)
      .orElseThrow();

    // Cannot reverse if settlement is final
    if (payment.getStatus() == PaymentStatus.FINAL) {
      return false;
    }

    // Cannot reverse if past cut-off time
    if (LocalDateTime.now().isAfter(payment.getReversalCutoff())) {
      return false;
    }

    return true;
  }
}`
      }
    },
    {
      id: 5,
      name: 'Regulatory Compliance',
      icon: '📋',
      color: '#ef4444',
      description: 'Banking regulations and compliance',
      content: {
        explanation: 'Regulatory compliance ensures banks follow legal requirements. PCI-DSS secures payment card data. SOX mandates financial reporting accuracy. KYC (Know Your Customer) verifies customer identity. AML (Anti-Money Laundering) detects suspicious transactions. GDPR protects customer data privacy. Audit trails track all system activities. Data retention policies define how long data is stored.',
        keyPoints: [
          'PCI-DSS - Payment Card Industry Data Security Standard for card data',
          'SOX - Sarbanes-Oxley Act for financial reporting accuracy',
          'KYC/AML - Know Your Customer, Anti-Money Laundering compliance',
          'GDPR - General Data Protection Regulation for data privacy',
          'Audit trails - comprehensive logging of all activities',
          'Data retention - legal requirements for storing transaction records'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ KYC (Know Your Customer) Implementation
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class KycService {

  @Autowired
  private CustomerRepository customerRepository;

  @Autowired
  private IdentityVerificationService idVerification;

  public KycResult performKyc(KycRequest request) {
    KycResult result = new KycResult();

    // 1. Identity Verification
    IdentityCheck idCheck = idVerification.verify(
      request.getFirstName(),
      request.getLastName(),
      request.getDateOfBirth(),
      request.getSsn()
    );

    result.setIdentityVerified(idCheck.isVerified());

    if (!idCheck.isVerified()) {
      result.setStatus(KycStatus.FAILED);
      result.setReason("Identity verification failed");
      return result;
    }

    // 2. Address Verification
    AddressCheck addressCheck = verifyAddress(request.getAddress());
    result.setAddressVerified(addressCheck.isVerified());

    // 3. Document Verification
    DocumentCheck docCheck = verifyDocuments(
      request.getIdDocument(),
      request.getProofOfAddress()
    );
    result.setDocumentsVerified(docCheck.isVerified());

    // 4. Risk Assessment
    RiskScore riskScore = assessRisk(request);
    result.setRiskScore(riskScore.getScore());
    result.setRiskLevel(riskScore.getLevel());

    // 5. Sanctions and PEP Check
    SanctionsCheck sanctionsCheck = checkSanctions(
      request.getFirstName(),
      request.getLastName(),
      request.getDateOfBirth()
    );

    result.setSanctionsMatch(sanctionsCheck.hasMatch());
    result.setPepMatch(sanctionsCheck.isPep());

    if (sanctionsCheck.hasMatch() || sanctionsCheck.isPep()) {
      result.setStatus(KycStatus.REQUIRES_REVIEW);
      result.setReason("Sanctions or PEP match found");
      return result;
    }

    // 6. Final Decision
    if (result.isIdentityVerified() &&
        result.isAddressVerified() &&
        result.isDocumentsVerified() &&
        result.getRiskLevel() != RiskLevel.HIGH) {

      result.setStatus(KycStatus.APPROVED);
      result.setCustomerTier(determineTier(riskScore));
    } else {
      result.setStatus(KycStatus.REQUIRES_REVIEW);
    }

    // Store KYC record
    storeKycRecord(request, result);

    return result;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ AML (Anti-Money Laundering) Monitoring
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class AmlService {

  @Autowired
  private TransactionRepository transactionRepository;

  @Autowired
  private SuspiciousActivityRepository sarRepository;

  // Transaction Monitoring
  public void monitorTransaction(Transaction transaction) {
    List<AmlRule> triggers = new ArrayList<>();

    // Rule 1: Large cash transactions (>$10,000)
    if (transaction.getAmount().compareTo(BigDecimal.valueOf(10000)) > 0 &&
        transaction.getType() == TransactionType.CASH) {
      triggers.add(new AmlRule("LARGE_CASH", "CTR Required"));
    }

    // Rule 2: Structuring (multiple transactions just under threshold)
    if (detectStructuring(transaction)) {
      triggers.add(new AmlRule("STRUCTURING", "Potential structuring detected"));
    }

    // Rule 3: Unusual pattern
    if (detectUnusualPattern(transaction)) {
      triggers.add(new AmlRule("UNUSUAL_PATTERN", "Abnormal transaction pattern"));
    }

    // Rule 4: High-risk jurisdiction
    if (isHighRiskJurisdiction(transaction.getCounterpartyCountry())) {
      triggers.add(new AmlRule("HIGH_RISK_JURISDICTION", "Transaction to high-risk country"));
    }

    // File SAR if triggers found
    if (!triggers.isEmpty()) {
      fileSuspiciousActivityReport(transaction, triggers);
    }
  }

  private boolean detectStructuring(Transaction transaction) {
    LocalDateTime oneDayAgo = LocalDateTime.now().minusDays(1);

    List<Transaction> recentTransactions = transactionRepository
      .findByAccountAndDateRange(
        transaction.getAccountId(),
        oneDayAgo,
        LocalDateTime.now()
      );

    // Check for multiple transactions just under $10,000
    long suspiciousCount = recentTransactions.stream()
      .filter(t -> t.getAmount().compareTo(BigDecimal.valueOf(9000)) > 0)
      .filter(t -> t.getAmount().compareTo(BigDecimal.valueOf(10000)) < 0)
      .count();

    return suspiciousCount >= 3;
  }

  private void fileSuspiciousActivityReport(
      Transaction transaction,
      List<AmlRule> triggers) {

    SuspiciousActivityReport sar = new SuspiciousActivityReport();
    sar.setTransactionId(transaction.getId());
    sar.setAccountId(transaction.getAccountId());
    sar.setAmount(transaction.getAmount());
    sar.setTriggers(triggers);
    sar.setStatus(SarStatus.PENDING_REVIEW);
    sar.setFiledAt(LocalDateTime.now());

    sarRepository.save(sar);

    // Notify compliance team
    complianceNotificationService.notifySar(sar);

    log.warn("SAR filed for transaction: {}, triggers: {}",
      transaction.getId(), triggers);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Audit Trail & Data Access Logging
// ═══════════════════════════════════════════════════════════════════════════
@Aspect
@Component
public class AuditAspect {

  @Autowired
  private AuditLogRepository auditLogRepository;

  @Around("@annotation(Audited)")
  public Object auditMethod(ProceedingJoinPoint joinPoint) throws Throwable {
    String username = SecurityContextHolder.getContext()
      .getAuthentication()
      .getName();

    String methodName = joinPoint.getSignature().getName();
    Object[] args = joinPoint.getArgs();

    AuditLog log = new AuditLog();
    log.setUsername(username);
    log.setAction(methodName);
    log.setParameters(Arrays.toString(args));
    log.setTimestamp(LocalDateTime.now());
    log.setIpAddress(getClientIpAddress());

    try {
      Object result = joinPoint.proceed();

      log.setStatus(AuditStatus.SUCCESS);
      log.setResult(result != null ? result.toString() : null);

      return result;
    } catch (Exception e) {
      log.setStatus(AuditStatus.FAILED);
      log.setErrorMessage(e.getMessage());
      throw e;
    } finally {
      auditLogRepository.save(log);
    }
  }
}

@Service
public class AccountService {

  @Audited
  @Transactional
  public Account createAccount(AccountRequest request) {
    // This method will be automatically audited
    Account account = new Account();
    account.setAccountNumber(generateAccountNumber());
    account.setCustomerId(request.getCustomerId());
    account.setBalance(BigDecimal.ZERO);
    return accountRepository.save(account);
  }

  @Audited
  public BigDecimal getBalance(Long accountId) {
    // Audit trail for sensitive data access
    return accountRepository.findById(accountId)
      .map(Account::getBalance)
      .orElseThrow();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Data Retention & GDPR Compliance
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class DataRetentionService {

  @Scheduled(cron = "0 0 2 * * ?")  // 2 AM daily
  public void enforceRetentionPolicy() {
    // Regulatory requirement: Keep transaction records for 7 years
    LocalDate retentionCutoff = LocalDate.now().minusYears(7);

    // Archive old transactions
    List<Transaction> oldTransactions = transactionRepository
      .findOlderThan(retentionCutoff);

    if (!oldTransactions.isEmpty()) {
      archiveTransactions(oldTransactions);
      log.info("Archived {} transactions older than {}",
        oldTransactions.size(), retentionCutoff);
    }

    // Delete after archive confirmation
    transactionRepository.deleteOlderThan(retentionCutoff);
  }

  private void archiveTransactions(List<Transaction> transactions) {
    // Write to cold storage (S3 Glacier, tape backup, etc.)
    for (Transaction tx : transactions) {
      ArchiveRecord record = new ArchiveRecord();
      record.setTransactionId(tx.getId());
      record.setData(serializeTransaction(tx));
      record.setArchivedAt(LocalDateTime.now());
      archiveRepository.save(record);
    }
  }
}

// GDPR Compliance - Right to be Forgotten
@Service
public class GdprService {

  @Transactional
  public void processDataDeletionRequest(Long customerId) {
    Customer customer = customerRepository.findById(customerId)
      .orElseThrow();

    // 1. Anonymize personal data (keep transaction records)
    customer.setFirstName("DELETED");
    customer.setLastName("DELETED");
    customer.setEmail("deleted@example.com");
    customer.setSsn(null);
    customer.setPhone(null);
    customer.setAddress(null);
    customer.setDateOfBirth(null);

    customerRepository.save(customer);

    // 2. Delete non-essential data
    customerDocumentRepository.deleteByCustomerId(customerId);
    customerPreferenceRepository.deleteByCustomerId(customerId);

    // 3. Create audit log
    AuditLog log = new AuditLog();
    log.setAction("GDPR_DELETION");
    log.setCustomerId(customerId);
    log.setTimestamp(LocalDateTime.now());
    auditLogRepository.save(log);

    log.info("GDPR data deletion completed for customer: {}", customerId);
  }
}`
      }
    },
    {
      id: 6,
      name: 'Financial Messaging',
      icon: '📨',
      color: '#ec4899',
      description: 'ISO 20022, SWIFT, FIX protocols',
      content: {
        explanation: 'Financial messaging protocols standardize communication between financial institutions. ISO 20022 is the global standard for financial messages using XML. SWIFT messages facilitate international money transfers. FIX (Financial Information eXchange) protocol handles securities trading. Message formats define structure and required fields. Financial standards ensure interoperability across systems and countries.',
        keyPoints: [
          'ISO 20022 - XML-based global standard for financial messages',
          'SWIFT messages - MT (legacy) and MX (ISO 20022) formats for cross-border',
          'FIX protocol - real-time electronic communication for securities trading',
          'Message formats - structured fields, mandatory/optional elements',
          'Financial standards - ensure global interoperability',
          'Message validation - schema validation, business rule checks'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ ISO 20022 Message Creation & Parsing
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class Iso20022MessageService {

  // Create payment initiation message (pain.001)
  public String createPaymentInitiation(PaymentRequest request) {
    // pain.001.001.09 - Customer Credit Transfer Initiation
    StringBuilder xml = new StringBuilder();

    xml.append("<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>\\n");
    xml.append("<Document xmlns=\\"urn:iso:std:iso:20022:tech:xsd:pain.001.001.09\\">\\n");
    xml.append("  <CstmrCdtTrfInitn>\\n");

    // Group Header
    xml.append("    <GrpHdr>\\n");
    xml.append("      <MsgId>").append(UUID.randomUUID()).append("</MsgId>\\n");
    xml.append("      <CreDtTm>").append(LocalDateTime.now()).append("</CreDtTm>\\n");
    xml.append("      <NbOfTxs>1</NbOfTxs>\\n");
    xml.append("      <CtrlSum>").append(request.getAmount()).append("</CtrlSum>\\n");
    xml.append("      <InitgPty>\\n");
    xml.append("        <Nm>").append(request.getDebtorName()).append("</Nm>\\n");
    xml.append("      </InitgPty>\\n");
    xml.append("    </GrpHdr>\\n");

    // Payment Information
    xml.append("    <PmtInf>\\n");
    xml.append("      <PmtInfId>").append(request.getPaymentId()).append("</PmtInfId>\\n");
    xml.append("      <PmtMtd>TRF</PmtMtd>\\n");
    xml.append("      <ReqdExctnDt>\\n");
    xml.append("        <Dt>").append(request.getExecutionDate()).append("</Dt>\\n");
    xml.append("      </ReqdExctnDt>\\n");

    // Debtor
    xml.append("      <Dbtr>\\n");
    xml.append("        <Nm>").append(request.getDebtorName()).append("</Nm>\\n");
    xml.append("      </Dbtr>\\n");

    // Debtor Account
    xml.append("      <DbtrAcct>\\n");
    xml.append("        <Id>\\n");
    xml.append("          <IBAN>").append(request.getDebtorIban()).append("</IBAN>\\n");
    xml.append("        </Id>\\n");
    xml.append("      </DbtrAcct>\\n");

    // Debtor Agent (Bank)
    xml.append("      <DbtrAgt>\\n");
    xml.append("        <FinInstnId>\\n");
    xml.append("          <BIC>").append(request.getDebtorBic()).append("</BIC>\\n");
    xml.append("        </FinInstnId>\\n");
    xml.append("      </DbtrAgt>\\n");

    // Credit Transfer Transaction
    xml.append("      <CdtTrfTxInf>\\n");
    xml.append("        <PmtId>\\n");
    xml.append("          <EndToEndId>").append(request.getEndToEndId()).append("</EndToEndId>\\n");
    xml.append("        </PmtId>\\n");

    // Amount
    xml.append("        <Amt>\\n");
    xml.append("          <InstdAmt Ccy=\\"USD\\">")
      .append(request.getAmount()).append("</InstdAmt>\\n");
    xml.append("        </Amt>\\n");

    // Creditor Agent
    xml.append("        <CdtrAgt>\\n");
    xml.append("          <FinInstnId>\\n");
    xml.append("            <BIC>").append(request.getCreditorBic()).append("</BIC>\\n");
    xml.append("          </FinInstnId>\\n");
    xml.append("        </CdtrAgt>\\n");

    // Creditor
    xml.append("        <Cdtr>\\n");
    xml.append("          <Nm>").append(request.getCreditorName()).append("</Nm>\\n");
    xml.append("        </Cdtr>\\n");

    // Creditor Account
    xml.append("        <CdtrAcct>\\n");
    xml.append("          <Id>\\n");
    xml.append("            <IBAN>").append(request.getCreditorIban()).append("</IBAN>\\n");
    xml.append("          </Id>\\n");
    xml.append("        </CdtrAcct>\\n");

    xml.append("      </CdtTrfTxInf>\\n");
    xml.append("    </PmtInf>\\n");
    xml.append("  </CstmrCdtTrfInitn>\\n");
    xml.append("</Document>");

    return xml.toString();
  }

  // Parse payment status report (pain.002)
  public PaymentStatus parsePaymentStatusReport(String xml) {
    // Parse pain.002.001.10 - Payment Status Report
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
    factory.setNamespaceAware(true);

    try {
      Document doc = factory.newDocumentBuilder()
        .parse(new InputSource(new StringReader(xml)));

      XPath xpath = XPathFactory.newInstance().newXPath();

      String messageId = xpath.evaluate("//MsgId", doc);
      String status = xpath.evaluate("//TxSts", doc);
      String statusReason = xpath.evaluate("//StsRsnInf/Rsn/Cd", doc);

      return new PaymentStatus(messageId, status, statusReason);
    } catch (Exception e) {
      throw new MessageParsingException("Failed to parse ISO 20022 message", e);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ SWIFT MT103 Wire Transfer Messages
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class SwiftMessageService {

  // Create MT103 (Single Customer Credit Transfer)
  public String createMT103(WireTransferRequest request) {
    StringBuilder mt103 = new StringBuilder();

    // Basic Header Block
    mt103.append("{1:").append("F01BANKUS33AXXX0000000000").append("}");

    // Application Header Block
    mt103.append("{2:").append("O1030800210101BANKGB22XXXX00000000002101010800N").append("}");

    // User Header Block
    mt103.append("{3:{108:").append(request.getReference()).append("}}");

    // Text Block
    mt103.append("{4:\\n");

    // Field 20: Transaction Reference
    mt103.append(":20:").append(request.getReference()).append("\\n");

    // Field 23B: Bank Operation Code
    mt103.append(":23B:CRED\\n");

    // Field 32A: Value Date, Currency, Amount
    mt103.append(":32A:")
      .append(request.getValueDate().format(DateTimeFormatter.ofPattern("yyMMdd")))
      .append(request.getCurrency())
      .append(request.getAmount())
      .append("\\n");

    // Field 50K: Ordering Customer
    mt103.append(":50K:/").append(request.getOrderingAccount()).append("\\n");
    mt103.append(request.getOrderingName()).append("\\n");
    mt103.append(request.getOrderingAddress()).append("\\n");

    // Field 59: Beneficiary Customer
    mt103.append(":59:/").append(request.getBeneficiaryAccount()).append("\\n");
    mt103.append(request.getBeneficiaryName()).append("\\n");
    mt103.append(request.getBeneficiaryAddress()).append("\\n");

    // Field 71A: Details of Charges
    mt103.append(":71A:SHA\\n");  // Shared charges

    // Field 72: Sender to Receiver Information
    if (request.getPaymentDetails() != null) {
      mt103.append(":72:/INS/").append(request.getPaymentDetails()).append("\\n");
    }

    mt103.append("-}");

    // Trailer Block
    mt103.append("{5:{MAC:00000000}{CHK:000000000000}}");

    return mt103.toString();
  }

  // Parse MT103
  public WireTransferDetails parseMT103(String swiftMessage) {
    WireTransferDetails details = new WireTransferDetails();

    // Extract fields using regex
    Pattern referencePattern = Pattern.compile(":20:([^\\\\n]+)");
    Matcher matcher = referencePattern.matcher(swiftMessage);
    if (matcher.find()) {
      details.setReference(matcher.group(1));
    }

    // Extract amount
    Pattern amountPattern = Pattern.compile(":32A:(\\\\d{6})([A-Z]{3})([\\\\d,\\\\.]+)");
    matcher = amountPattern.matcher(swiftMessage);
    if (matcher.find()) {
      details.setValueDate(LocalDate.parse(matcher.group(1),
        DateTimeFormatter.ofPattern("yyMMdd")));
      details.setCurrency(matcher.group(2));
      details.setAmount(new BigDecimal(matcher.group(3).replace(",", "")));
    }

    return details;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ FIX Protocol for Securities Trading
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class FixMessageService {

  private static final char SOH = '\\\\u0001';  // Start of Header

  // Create New Order Single (35=D)
  public String createNewOrderSingle(OrderRequest request) {
    StringBuilder fix = new StringBuilder();

    // Header
    fix.append("8=FIX.4.4").append(SOH);  // BeginString
    fix.append("35=D").append(SOH);  // MsgType: New Order Single

    // Standard Header
    fix.append("49=SENDER").append(SOH);  // SenderCompID
    fix.append("56=TARGET").append(SOH);  // TargetCompID
    fix.append("34=1").append(SOH);  // MsgSeqNum
    fix.append("52=").append(LocalDateTime.now()
      .format(DateTimeFormatter.ofPattern("yyyyMMdd-HH:mm:ss"))).append(SOH);

    // Body
    fix.append("11=").append(request.getOrderId()).append(SOH);  // ClOrdID
    fix.append("55=").append(request.getSymbol()).append(SOH);  // Symbol
    fix.append("54=").append(request.getSide()).append(SOH);  // Side (1=Buy, 2=Sell)
    fix.append("60=").append(LocalDateTime.now()
      .format(DateTimeFormatter.ofPattern("yyyyMMdd-HH:mm:ss"))).append(SOH);  // TransactTime
    fix.append("38=").append(request.getQuantity()).append(SOH);  // OrderQty
    fix.append("40=").append(request.getOrderType()).append(SOH);  // OrdType (1=Market, 2=Limit)

    if (request.getOrderType().equals("2")) {
      fix.append("44=").append(request.getPrice()).append(SOH);  // Price
    }

    // Calculate and append checksum
    String message = fix.toString();
    int checksum = calculateChecksum(message);
    fix.append("10=").append(String.format("%03d", checksum)).append(SOH);

    return fix.toString();
  }

  private int calculateChecksum(String message) {
    int checksum = 0;
    for (char c : message.toCharArray()) {
      checksum += c;
    }
    return checksum % 256;
  }

  // Parse FIX message
  public Map<String, String> parseFixMessage(String fixMessage) {
    Map<String, String> fields = new HashMap<>();

    String[] parts = fixMessage.split(String.valueOf(SOH));
    for (String part : parts) {
      String[] keyValue = part.split("=", 2);
      if (keyValue.length == 2) {
        fields.put(keyValue[0], keyValue[1]);
      }
    }

    return fields;
  }
}`
      }
    },
    {
      id: 7,
      name: 'Critical Infrastructure',
      icon: '🏗️',
      color: '#06b6d4',
      description: '24/7 operations and high availability',
      content: {
        explanation: 'Banking systems are critical infrastructure requiring exceptional reliability. 24/7 operations demand continuous monitoring and support. Five nines availability (99.999%) allows only 5.26 minutes downtime per year. Zero downtime deployment uses blue-green or canary strategies. Fault tolerance ensures system continues despite component failures. Circuit breakers prevent cascading failures. Comprehensive monitoring detects issues before they impact users.',
        keyPoints: [
          '24/7 operations - continuous availability, no maintenance windows',
          'Five nines (99.999%) - maximum 5.26 minutes downtime per year',
          'Zero downtime deployment - blue-green, canary, rolling deployments',
          'Fault tolerance - continue operating despite failures',
          'Circuit breakers - prevent cascading failures, fail fast',
          'Comprehensive monitoring - proactive issue detection, alerting'
        ],
        codeExample: `// ═══════════════════════════════════════════════════════════════════════════
// ✦ Health Monitoring & System Checks
// ═══════════════════════════════════════════════════════════════════════════
@Component
public class SystemHealthMonitor {

  @Autowired
  private DataSource dataSource;

  @Autowired
  private RedisTemplate<String, String> redisTemplate;

  @Autowired
  private MetricRegistry metricRegistry;

  @Scheduled(fixedRate = 30000)  // Every 30 seconds
  public void checkSystemHealth() {
    HealthStatus status = new HealthStatus();

    // Database health
    status.setDatabase(checkDatabase());

    // Cache health
    status.setCache(checkCache());

    // External services
    status.setPaymentGateway(checkPaymentGateway());

    // System resources
    status.setCpuUsage(getSystemCpuLoad());
    status.setMemoryUsage(getMemoryUsage());
    status.setDiskSpace(getDiskSpace());

    // Record metrics
    metricRegistry.gauge("system.health.database",
      () -> status.getDatabase().isHealthy() ? 1 : 0);

    metricRegistry.gauge("system.health.cache",
      () -> status.getCache().isHealthy() ? 1 : 0);

    // Alert if unhealthy
    if (!status.isHealthy()) {
      alertOpsTeam(status);
    }
  }

  private ComponentHealth checkDatabase() {
    try (Connection conn = dataSource.getConnection()) {
      Statement stmt = conn.createStatement();
      ResultSet rs = stmt.executeQuery("SELECT 1");

      long responseTime = measureQueryTime(() -> rs.next());

      return ComponentHealth.builder()
        .healthy(true)
        .responseTime(responseTime)
        .build();
    } catch (SQLException e) {
      return ComponentHealth.builder()
        .healthy(false)
        .error(e.getMessage())
        .build();
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Zero Downtime Deployment (Blue-Green & Canary)
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class BlueGreenDeploymentService {

  private volatile String activeEnvironment = "blue";
  private final Map<String, ApplicationContext> environments = new HashMap<>();

  public void deployNewVersion(String version) {
    String inactiveEnv = activeEnvironment.equals("blue") ? "green" : "blue";

    log.info("Deploying version {} to {} environment", version, inactiveEnv);

    try {
      // 1. Deploy to inactive environment
      deployToEnvironment(inactiveEnv, version);

      // 2. Health check new deployment
      if (!healthCheckEnvironment(inactiveEnv)) {
        throw new DeploymentException("Health check failed");
      }

      // 3. Smoke tests
      if (!runSmokeTests(inactiveEnv)) {
        throw new DeploymentException("Smoke tests failed");
      }

      // 4. Switch traffic (zero downtime)
      switchTraffic(inactiveEnv);

      // 5. Monitor for errors
      Thread.sleep(60000);  // Monitor for 1 minute

      if (getErrorRate(inactiveEnv) > 0.01) {
        // Rollback if error rate > 1%
        rollback();
        throw new DeploymentException("High error rate detected");
      }

      log.info("Deployment successful, active environment: {}", inactiveEnv);

    } catch (Exception e) {
      log.error("Deployment failed, rolling back", e);
      rollback();
      throw new DeploymentException(e);
    }
  }

  private void switchTraffic(String newEnvironment) {
    // Update load balancer configuration
    loadBalancer.setBackend(environments.get(newEnvironment));

    // Update active environment
    activeEnvironment = newEnvironment;

    log.info("Traffic switched to {} environment", newEnvironment);
  }

  private void rollback() {
    String previousEnv = activeEnvironment.equals("blue") ? "green" : "blue";
    switchTraffic(previousEnv);
    log.info("Rolled back to {} environment", previousEnv);
  }
}

// Canary Deployment
@Service
public class CanaryDeploymentService {

  public void deployCanary(String version) {
    log.info("Starting canary deployment for version: {}", version);

    // 1. Deploy canary (5% traffic)
    deployCanaryInstance(version);
    routeTrafficToCanary(5);

    // 2. Monitor for 10 minutes
    Thread.sleep(600000);

    if (getCanaryErrorRate() > getProductionErrorRate() * 1.1) {
      log.error("Canary showing elevated errors, aborting");
      removeCanary();
      return;
    }

    // 3. Increase to 25% traffic
    routeTrafficToCanary(25);
    Thread.sleep(600000);

    if (getCanaryErrorRate() > getProductionErrorRate() * 1.1) {
      log.error("Canary showing elevated errors at 25%, aborting");
      removeCanary();
      return;
    }

    // 4. Increase to 50% traffic
    routeTrafficToCanary(50);
    Thread.sleep(600000);

    // 5. Full rollout
    routeTrafficToCanary(100);
    removeOldVersion();

    log.info("Canary deployment completed successfully");
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ Circuit Breakers & Fault Tolerance
// ═══════════════════════════════════════════════════════════════════════════
@Configuration
public class CircuitBreakerConfig {

  @Bean
  public CircuitBreakerRegistry circuitBreakerRegistry() {
    CircuitBreakerConfig config = CircuitBreakerConfig.custom()
      .failureRateThreshold(50)
      .waitDurationInOpenState(Duration.ofSeconds(30))
      .slidingWindowType(SlidingWindowType.COUNT_BASED)
      .slidingWindowSize(10)
      .minimumNumberOfCalls(5)
      .automaticTransitionFromOpenToHalfOpenEnabled(true)
      .build();

    return CircuitBreakerRegistry.of(config);
  }
}

@Service
public class PaymentGatewayService {

  private final CircuitBreaker circuitBreaker;

  public PaymentGatewayService(CircuitBreakerRegistry registry) {
    this.circuitBreaker = registry.circuitBreaker("payment-gateway");

    // Listen to state transitions
    circuitBreaker.getEventPublisher()
      .onStateTransition(event -> {
        log.warn("Circuit breaker state changed: {} -> {}",
          event.getStateTransition().getFromState(),
          event.getStateTransition().getToState());

        if (event.getStateTransition().getToState() == CircuitBreaker.State.OPEN) {
          alertOpsTeam("Payment gateway circuit breaker OPEN");
        }
      });
  }

  public PaymentResponse processPayment(PaymentRequest request) {
    return circuitBreaker.executeSupplier(() -> {
      try {
        return paymentGatewayClient.process(request);
      } catch (Exception e) {
        throw new PaymentGatewayException(e);
      }
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ✦ SLA Monitoring & Bulkhead Pattern
// ═══════════════════════════════════════════════════════════════════════════
@Service
public class SlaMonitoringService {

  private static final double TARGET_AVAILABILITY = 0.99999;  // 99.999%
  private static final long MAX_RESPONSE_TIME_MS = 100;

  @Scheduled(fixedRate = 60000)  // Every minute
  public void checkSla() {
    SlaMetrics metrics = calculateSlaMetrics();

    // Availability check
    if (metrics.getAvailability() < TARGET_AVAILABILITY) {
      log.error("SLA BREACH: Availability {} < target {}",
        metrics.getAvailability(), TARGET_AVAILABILITY);

      alertManagement(
        "SLA Breach - Availability",
        String.format("Current: %.5f%%, Target: %.5f%%",
          metrics.getAvailability() * 100,
          TARGET_AVAILABILITY * 100)
      );
    }

    // Response time check
    if (metrics.getP99ResponseTime() > MAX_RESPONSE_TIME_MS) {
      log.warn("SLA WARNING: P99 response time {} > target {}",
        metrics.getP99ResponseTime(), MAX_RESPONSE_TIME_MS);
    }

    // Calculate downtime budget
    long downtimeThisMonth = calculateDowntime(LocalDate.now().withDayOfMonth(1));
    long allowedDowntime = Duration.ofDays(30)
      .toMillis() * (1 - TARGET_AVAILABILITY);

    if (downtimeThisMonth > allowedDowntime * 0.8) {
      log.warn("Downtime budget 80% exhausted: {}ms of {}ms used",
        downtimeThisMonth, allowedDowntime);
    }
  }
}

// Fault Tolerance - Bulkhead Pattern
@Configuration
public class BulkheadConfig {

  @Bean
  public ThreadPoolBulkheadRegistry bulkheadRegistry() {
    ThreadPoolBulkheadConfig config = ThreadPoolBulkheadConfig.custom()
      .maxThreadPoolSize(10)
      .coreThreadPoolSize(5)
      .queueCapacity(50)
      .keepAliveDuration(Duration.ofMillis(1000))
      .build();

    return ThreadPoolBulkheadRegistry.of(config);
  }
}

@Service
public class IsolatedService {

  private final ThreadPoolBulkhead bulkhead;

  public IsolatedService(ThreadPoolBulkheadRegistry registry) {
    this.bulkhead = registry.bulkhead("isolated-service");
  }

  public CompletableFuture<Result> execute(Request request) {
    // Isolated thread pool - failures don't affect other services
    return bulkhead.executeSupplier(() -> {
      return externalService.call(request);
    });
  }
}`
      }
    }
  ]

  const selectedTopicRef = useRef(selectedTopic)
  useEffect(() => {
    selectedTopicRef.current = selectedTopic
  }, [selectedTopic])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedTopicRef.current) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedTopic(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(16, 185, 129, 0.4)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          🏦 Financial Banking
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(16, 185, 129, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Banking and financial systems covering payment systems, transaction processing, banking domain concepts,
          settlement and clearing, regulatory compliance, financial messaging protocols, and critical infrastructure.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedTopic ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedTopic ? (
          bankingTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid rgba(16, 185, 129, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)'
                e.currentTarget.style.borderColor = topic.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 16px ${topic.color}33`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: topic.color,
                  margin: '0 0 0.5rem 0'
                }}>
                  {topic.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {topic.description}
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: topic.color,
                marginTop: '1rem'
              }}>
                Click to explore →
              </div>
            </div>
          ))
        ) : (
          <>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                Banking Topics
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {bankingTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    style={{
                      backgroundColor: selectedTopic?.id === topic.id
                        ? `${topic.color}15`
                        : 'rgba(16, 185, 129, 0.05)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedTopic?.id === topic.id
                        ? `3px solid ${topic.color}`
                        : '2px solid rgba(16, 185, 129, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)'
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{topic.icon}</span>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: selectedTopic?.id === topic.id ? topic.color : '#1f2937'
                      }}>
                        {topic.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: selectedTopic.color,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{selectedTopic.icon}</span>
                {selectedTopic.name}
              </h3>

              <div style={{
                backgroundColor: `${selectedTopic.color}08`,
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${selectedTopic.color}33`,
                marginBottom: '1.5rem'
              }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#374151',
                  fontWeight: '500',
                  margin: 0,
                  lineHeight: '1.7',
                  textAlign: 'justify'
                }}>
                  {selectedTopic.content.explanation}
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${selectedTopic.color}33`,
                marginBottom: '1.5rem'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: selectedTopic.color,
                  margin: '0 0 1rem 0'
                }}>
                  📌 Key Points
                </h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {selectedTopic.content.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        backgroundColor: `${selectedTopic.color}08`,
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        color: '#374151',
                        lineHeight: '1.6'
                      }}
                    >
                      <span style={{
                        color: selectedTopic.color,
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        lineHeight: '1'
                      }}>
                        •
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: selectedTopic.color
                  }} />
                  Implementation Details
                </h3>

                {parseCodeSections(selectedTopic.content.codeExample).map((section, index) => {
                  const sectionId = `section-${index}`
                  const isExpanded = expandedSections[sectionId]

                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        marginBottom: '1rem',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {/* Section header - clickable */}
                      <div
                        onClick={() => toggleSection(sectionId)}
                        style={{
                          padding: '1.25rem 1.5rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: isExpanded ? `${selectedTopic.color}08` : 'white',
                          transition: 'all 0.2s ease',
                          borderBottom: isExpanded ? `2px solid ${selectedTopic.color}20` : 'none'
                        }}
                        onMouseOver={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.backgroundColor = '#f9fafb'
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.backgroundColor = 'white'
                          }
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            backgroundColor: `${selectedTopic.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: selectedTopic.color,
                            fontWeight: '700',
                            fontSize: '1rem'
                          }}>
                            {index + 1}
                          </div>
                          <h4 style={{
                            margin: 0,
                            fontSize: '1.15rem',
                            fontWeight: '600',
                            color: '#1f2937'
                          }}>
                            {section.title}
                          </h4>
                        </div>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: isExpanded ? selectedTopic.color : '#f3f4f6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                          color: isExpanded ? 'white' : '#6b7280',
                          fontSize: '1.25rem',
                          fontWeight: '700'
                        }}>
                          {isExpanded ? '−' : '+'}
                        </div>
                      </div>

                      {/* Section content - expandable */}
                      {isExpanded && (
                        <div style={{
                          backgroundColor: '#1e1e1e',
                          padding: '1.5rem',
                          overflow: 'auto'
                        }}>
                          <SyntaxHighlighter code={section.code} />
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Expand/Collapse all button */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginTop: '1.5rem'
                }}>
                  <button
                    onClick={() => {
                      const allExpanded = {}
                      parseCodeSections(selectedTopic.content.codeExample).forEach((_, index) => {
                        allExpanded[`section-${index}`] = true
                      })
                      setExpandedSections(allExpanded)
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      backgroundColor: selectedTopic.color,
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: `0 4px 12px -2px ${selectedTopic.color}60`
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = `0 6px 16px -2px ${selectedTopic.color}80`
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = `0 4px 12px -2px ${selectedTopic.color}60`
                    }}
                  >
                    Expand All
                  </button>
                  <button
                    onClick={() => setExpandedSections({})}
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      backgroundColor: 'white',
                      color: '#374151',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#f9fafb'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'white'
                      e.target.style.transform = 'translateY(0)'
                    }}
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FinancialBanking
