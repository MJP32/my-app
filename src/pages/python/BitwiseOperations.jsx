import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const BitwiseOperations = ({ onBack, breadcrumb }) => {
  const [selectedConcept, setSelectedConcept] = useState(null)

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

  const concepts = [
    {
      name: 'Bitwise AND (&)',
      icon: '🔒',
      explanation: `Bitwise AND operation returns 1 only if both bits are 1:

• **Syntax**: a & b
• **Truth Table**:
  - 1 & 1 = 1
  - 1 & 0 = 0
  - 0 & 1 = 0
  - 0 & 0 = 0

• **Common Uses**:
  - Check if number is even: n & 1 == 0
  - Extract specific bits (masking)
  - Clear bits to zero
  - Test flags in bit fields

• **Performance**: O(1) - single CPU instruction`,
      codeExample: `# Basic Bitwise AND
a = 12  # Binary: 1100
b = 10  # Binary: 1010
result = a & b  # Binary: 1000 (8)

print(f"{a} & {b} = {result}")  # Output: 12 & 10 = 8
print(f"Binary: {bin(a)} & {bin(b)} = {bin(result)}")

# Check if number is even
def is_even(n):
    return (n & 1) == 0

print(is_even(4))   # True
print(is_even(7))   # False

# Masking - extract specific bits
# Get lower 4 bits of a number
number = 0b11010110  # 214
mask = 0b00001111    # 15
lower_4_bits = number & mask
print(f"Lower 4 bits of {number}: {lower_4_bits}")  # 6 (0b0110)

# Check multiple flags
READ = 1    # 0b001
WRITE = 2   # 0b010
EXECUTE = 4 # 0b100

permissions = 7  # 0b111 (all permissions)
can_read = (permissions & READ) != 0
can_write = (permissions & WRITE) != 0
print(f"Can read: {can_read}, Can write: {can_write}")

# Clear specific bits
def clear_bit(num, position):
    """Clear bit at position"""
    mask = ~(1 << position)
    return num & mask

num = 0b1111  # 15
num = clear_bit(num, 2)  # Clear bit 2
print(f"After clearing bit 2: {bin(num)}")  # 0b1011 (11)`
    },
    {
      name: 'Bitwise OR (|)',
      icon: '🔓',
      explanation: `Bitwise OR operation returns 1 if at least one bit is 1:

• **Syntax**: a | b
• **Truth Table**:
  - 1 | 1 = 1
  - 1 | 0 = 1
  - 0 | 1 = 1
  - 0 | 0 = 0

• **Common Uses**:
  - Set specific bits to 1
  - Combine flags
  - Merge bit patterns
  - Add permissions

• **Performance**: O(1) - single CPU instruction`,
      codeExample: `# Basic Bitwise OR
a = 12  # Binary: 1100
b = 10  # Binary: 1010
result = a | b  # Binary: 1110 (14)

print(f"{a} | {b} = {result}")  # Output: 12 | 10 = 14
print(f"Binary: {bin(a)} | {bin(b)} = {bin(result)}")

# Set specific bits
def set_bit(num, position):
    """Set bit at position to 1"""
    return num | (1 << position)

num = 5  # Binary: 0101
num = set_bit(num, 1)  # Set bit 1 → 0111 (7)
print(f"After setting bit 1: {num}")  # Output: 7

# Set multiple bits at once
num = 0b0000
num |= 0b0101  # Set bits 0 and 2
print(f"After setting bits 0 and 2: {bin(num)}")  # 0b0101

# Combine permissions/flags
READ = 1    # 0b001
WRITE = 2   # 0b010
EXECUTE = 4 # 0b100

# Grant read and write permissions
permissions = READ | WRITE
print(f"Permissions: {bin(permissions)}")  # 0b011

# Add execute permission
permissions |= EXECUTE
print(f"All permissions: {bin(permissions)}")  # 0b111

# Merge bit patterns
pattern1 = 0b11110000
pattern2 = 0b00001111
merged = pattern1 | pattern2
print(f"Merged pattern: {bin(merged)}")  # 0b11111111

# Build permission set
class Permissions:
    NONE = 0
    READ = 1 << 0
    WRITE = 1 << 1
    EXECUTE = 1 << 2
    DELETE = 1 << 3

user_perms = Permissions.READ | Permissions.WRITE
admin_perms = Permissions.READ | Permissions.WRITE | Permissions.EXECUTE | Permissions.DELETE

print(f"User: {bin(user_perms)}, Admin: {bin(admin_perms)}")`
    },
    {
      name: 'Bitwise XOR (^)',
      icon: '⚡',
      explanation: `Bitwise XOR operation returns 1 if bits are different:

• **Syntax**: a ^ b
• **Truth Table**:
  - 1 ^ 1 = 0
  - 1 ^ 0 = 1
  - 0 ^ 1 = 1
  - 0 ^ 0 = 0

• **Key Properties**:
  - x ^ 0 = x (identity)
  - x ^ x = 0 (self-inverse)
  - x ^ y = y ^ x (commutative)
  - (x ^ y) ^ z = x ^ (y ^ z) (associative)

• **Common Uses**:
  - Toggle bits
  - Swap values without temp variable
  - Find unique elements in arrays
  - Detect differences
  - Simple encryption

• **Performance**: O(1) - single CPU instruction`,
      codeExample: `# Basic Bitwise XOR
a = 12  # Binary: 1100
b = 10  # Binary: 1010
result = a ^ b  # Binary: 0110 (6)

print(f"{a} ^ {b} = {result}")  # Output: 12 ^ 10 = 6
print(f"Binary: {bin(a)} ^ {bin(b)} = {bin(result)}")

# Swap two numbers without temp variable
a, b = 5, 7
print(f"Before: a={a}, b={b}")
a = a ^ b  # a = 5 ^ 7
b = a ^ b  # b = (5 ^ 7) ^ 7 = 5
a = a ^ b  # a = (5 ^ 7) ^ 5 = 7
print(f"After: a={a}, b={b}")  # a=7, b=5

# Find unique number in array (all others appear twice)
def find_unique(nums):
    """Find the one number that appears once"""
    result = 0
    for num in nums:
        result ^= num  # XOR cancels out duplicates
    return result

nums = [4, 1, 2, 1, 2]
print(f"Unique number: {find_unique(nums)}")  # Output: 4

# Toggle specific bit
def toggle_bit(num, position):
    """Toggle bit at position"""
    return num ^ (1 << position)

num = 5  # Binary: 0101
print(f"Original: {bin(num)}")
num = toggle_bit(num, 1)  # Toggle bit 1 → 0111 (7)
print(f"After toggle: {bin(num)}")
num = toggle_bit(num, 1)  # Toggle again → 0101 (5)
print(f"After toggle again: {bin(num)}")

# Find two unique numbers (all others appear twice)
def find_two_unique(nums):
    # All duplicates cancel out via XOR
    xor = 0
    for num in nums:
        xor ^= num

    # Find rightmost set bit (differs between the two numbers)
    rightmost_bit = xor & -xor

    # Divide numbers into two groups based on rightmost bit
    num1, num2 = 0, 0
    for num in nums:
        if num & rightmost_bit:
            num1 ^= num
        else:
            num2 ^= num

    return num1, num2

nums = [2, 3, 7, 9, 2, 3, 11, 9]
print(f"Two unique numbers: {find_two_unique(nums)}")  # (7, 11)

# Simple encryption/decryption
def encrypt(text, key):
    return ''.join(chr(ord(c) ^ key) for c in text)

def decrypt(encrypted, key):
    return encrypt(encrypted, key)  # XOR is its own inverse!

message = "Hello"
key = 42
encrypted = encrypt(message, key)
decrypted = decrypt(encrypted, key)
print(f"Original: {message}")
print(f"Encrypted: {encrypted}")
print(f"Decrypted: {decrypted}")

# Detect opposite signs
def opposite_signs(x, y):
    return (x ^ y) < 0

print(opposite_signs(100, -1))   # True
print(opposite_signs(100, 200))  # False
print(opposite_signs(-1, -100))  # False`
    },
    {
      name: 'Bitwise NOT (~)',
      icon: '🔄',
      explanation: `Bitwise NOT operation inverts all bits (1's complement):

• **Syntax**: ~a
• **Operation**: Flips every bit (0→1, 1→0)
• **Formula**: ~x = -(x + 1) (due to two's complement)

• **Two's Complement**:
  - Python uses two's complement for integers
  - ~x equals -(x + 1)
  - Sign bit is also inverted

• **Common Uses**:
  - Create bit masks
  - Clear specific bits
  - Bitwise complement
  - Negative numbers

• **Performance**: O(1) - single CPU instruction`,
      codeExample: `# Basic Bitwise NOT
a = 5  # Binary: 0101
result = ~a  # Binary: ...11111010 (-6 in two's complement)

print(f"~{a} = {result}")  # Output: ~5 = -6

# Formula: ~x = -(x + 1)
print(f"~10 = {~10}")    # -11
print(f"~(-5) = {~(-5)}") # 4
print(f"~0 = {~0}")       # -1

# Clear specific bit
def clear_bit(num, position):
    """Clear bit at position using NOT"""
    mask = ~(1 << position)
    return num & mask

num = 7  # Binary: 0111
num = clear_bit(num, 1)  # Clear bit 1 → 0101 (5)
print(f"After clearing bit 1: {num}")  # Output: 5

# Create bitmask
def create_mask(num_bits):
    """Create mask with num_bits set to 1"""
    return ~(~0 << num_bits)

mask_4_bits = create_mask(4)
print(f"4-bit mask: {bin(mask_4_bits)}")  # 0b1111

mask_8_bits = create_mask(8)
print(f"8-bit mask: {bin(mask_8_bits)}")  # 0b11111111

# Extract specific bits
def extract_bits(num, start, length):
    """Extract 'length' bits starting from 'start' position"""
    mask = ~(~0 << length)
    return (num >> start) & mask

num = 0b11010110  # 214
bits = extract_bits(num, 2, 4)  # Extract 4 bits starting at position 2
print(f"Extracted bits: {bin(bits)}")

# Invert specific bit range
def invert_range(num, start, end):
    """Invert bits from start to end (inclusive)"""
    length = end - start + 1
    mask = ~(~0 << length) << start
    return num ^ mask

num = 0b11110000
result = invert_range(num, 2, 5)
print(f"Original: {bin(num)}")
print(f"After inverting bits 2-5: {bin(result)}")

# NOT with masking for unsigned behavior
def unsigned_not(num, bits=8):
    """Perform NOT operation for unsigned integer"""
    mask = (1 << bits) - 1
    return ~num & mask

num = 5  # 0b00000101
result = unsigned_not(num, 8)
print(f"Unsigned NOT of {num}: {result}")  # 250 (0b11111010)`
    },
    {
      name: 'Left Shift (<<)',
      icon: '◀️',
      explanation: `Left shift moves bits to the left, filling with zeros:

• **Syntax**: a << n
• **Operation**: Shift bits left by n positions
• **Formula**: x << n = x × 2^n (multiplication by power of 2)

• **Behavior**:
  - Bits shift left
  - Right side filled with 0s
  - Left bits are discarded

• **Common Uses**:
  - Fast multiplication by 2^n
  - Create bit masks
  - Pack multiple values
  - Set specific bits

• **Performance**: O(1) - much faster than multiplication`,
      codeExample: `# Basic Left Shift
a = 5  # Binary: 0101
result = a << 1  # Binary: 1010 (10)

print(f"{a} << 1 = {result}")  # 5 * 2^1 = 10
print(f"{a} << 2 = {a << 2}")  # 5 * 2^2 = 20
print(f"{a} << 3 = {a << 3}")  # 5 * 2^3 = 40

# Formula: x << n = x * 2^n
print(f"7 << 3 = {7 << 3} (same as 7 * 8 = {7 * 8})")

# Visual representation
num = 3  # Binary: 0011
for i in range(5):
    shifted = num << i
    print(f"{num} << {i} = {shifted:3d} (Binary: {bin(shifted)})")

# Output:
# 3 << 0 =   3 (Binary: 0b11)
# 3 << 1 =   6 (Binary: 0b110)
# 3 << 2 =  12 (Binary: 0b1100)
# 3 << 3 =  24 (Binary: 0b11000)
# 3 << 4 =  48 (Binary: 0b110000)

# Fast multiplication by powers of 2
def fast_multiply(num, power):
    """Multiply num by 2^power"""
    return num << power

print(f"Fast: {fast_multiply(7, 3)}")  # 56
print(f"Normal: {7 * (2 ** 3)}")       # 56

# Create bit mask
def create_mask_at_position(position):
    """Create mask with bit set at position"""
    return 1 << position

print(f"Bit 0: {bin(create_mask_at_position(0))}")  # 0b1
print(f"Bit 1: {bin(create_mask_at_position(1))}")  # 0b10
print(f"Bit 2: {bin(create_mask_at_position(2))}")  # 0b100
print(f"Bit 3: {bin(create_mask_at_position(3))}")  # 0b1000

# Set multiple bits
def set_bits_at_positions(positions):
    """Set bits at multiple positions"""
    result = 0
    for pos in positions:
        result |= (1 << pos)
    return result

result = set_bits_at_positions([0, 2, 4, 6])
print(f"Set bits 0,2,4,6: {bin(result)}")  # 0b1010101

# Pack multiple values
def pack_rgb(r, g, b):
    """Pack RGB values into single integer"""
    return (r << 16) | (g << 8) | b

color = pack_rgb(255, 128, 64)
print(f"Packed color: {hex(color)}")  # 0xff8040

def unpack_rgb(color):
    """Unpack RGB values"""
    r = (color >> 16) & 0xFF
    g = (color >> 8) & 0xFF
    b = color & 0xFF
    return r, g, b

r, g, b = unpack_rgb(color)
print(f"Unpacked: R={r}, G={g}, B={b}")  # R=255, G=128, B=64

# Calculate power of 2
def is_power_of_2(n):
    """Check if n is power of 2"""
    return n > 0 and (n & (n - 1)) == 0

print(f"16 is power of 2: {is_power_of_2(16)}")  # True
print(f"15 is power of 2: {is_power_of_2(15)}")  # False

# Get power of 2
def next_power_of_2(n):
    """Get next power of 2 >= n"""
    power = 0
    while (1 << power) < n:
        power += 1
    return 1 << power

print(f"Next power of 2 >= 100: {next_power_of_2(100)}")  # 128`
    },
    {
      name: 'Right Shift (>>)',
      icon: '▶️',
      explanation: `Right shift moves bits to the right (arithmetic shift):

• **Syntax**: a >> n
• **Operation**: Shift bits right by n positions
• **Formula**: x >> n = x // 2^n (floor division by power of 2)

• **Behavior**:
  - Bits shift right
  - Left side filled with sign bit (arithmetic shift)
  - Right bits are discarded

• **Sign Extension**:
  - Positive numbers: fill with 0
  - Negative numbers: fill with 1 (preserves sign)

• **Common Uses**:
  - Fast division by 2^n
  - Extract high-order bits
  - Unpack values
  - Iterate through bits

• **Performance**: O(1) - much faster than division`,
      codeExample: `# Basic Right Shift
a = 20  # Binary: 10100
result = a >> 1  # Binary: 01010 (10)

print(f"{a} >> 1 = {result}")  # 20 / 2 = 10
print(f"{a} >> 2 = {a >> 2}")  # 20 / 4 = 5
print(f"{a} >> 3 = {a >> 3}")  # 20 / 8 = 2

# Formula: x >> n = x // 2^n (floor division)
print(f"100 >> 3 = {100 >> 3} (same as 100 // 8 = {100 // 8})")

# Visual representation
num = 100  # Binary: 1100100
for i in range(5):
    shifted = num >> i
    print(f"{num} >> {i} = {shifted:3d} (Binary: {bin(shifted)})")

# Output:
# 100 >> 0 = 100 (Binary: 0b1100100)
# 100 >> 1 =  50 (Binary: 0b110010)
# 100 >> 2 =  25 (Binary: 0b11001)
# 100 >> 3 =  12 (Binary: 0b1100)
# 100 >> 4 =   6 (Binary: 0b110)

# Fast division by powers of 2
def fast_divide(num, power):
    """Divide num by 2^power (floor division)"""
    return num >> power

print(f"Fast: {fast_divide(64, 3)}")  # 8
print(f"Normal: {64 // (2 ** 3)}")    # 8

# Sign extension with negative numbers
neg = -8  # Binary: ...11111000
print(f"{neg} >> 1 = {neg >> 1}")  # -4 (sign preserved)
print(f"{neg} >> 2 = {neg >> 2}")  # -2
print(f"{neg} >> 3 = {neg >> 3}")  # -1

# Extract high-order bits
def get_high_byte(num):
    """Get highest byte of 16-bit number"""
    return (num >> 8) & 0xFF

num = 0x1234  # 4660
high = get_high_byte(num)
print(f"High byte of {hex(num)}: {hex(high)}")  # 0x12

# Unpack RGB color
def unpack_rgb(color):
    """Unpack 24-bit RGB color"""
    r = (color >> 16) & 0xFF
    g = (color >> 8) & 0xFF
    b = color & 0xFF
    return r, g, b

color = 0xFF8040  # Red=255, Green=128, Blue=64
r, g, b = unpack_rgb(color)
print(f"RGB: R={r}, G={g}, B={b}")

# Count trailing zeros
def count_trailing_zeros(n):
    """Count number of trailing zero bits"""
    if n == 0:
        return 0
    count = 0
    while (n & 1) == 0:
        count += 1
        n >>= 1
    return count

print(f"Trailing zeros in 8: {count_trailing_zeros(8)}")    # 3 (0b1000)
print(f"Trailing zeros in 12: {count_trailing_zeros(12)}")  # 2 (0b1100)

# Extract nibbles (4-bit groups)
def extract_nibbles(num):
    """Extract all nibbles from number"""
    nibbles = []
    while num:
        nibbles.append(num & 0xF)
        num >>= 4
    return nibbles[::-1]

num = 0x12345678
nibbles = extract_nibbles(num)
print(f"Nibbles of {hex(num)}: {[hex(n) for n in nibbles]}")

# Iterate through set bits
def print_set_bits(n):
    """Print positions of all set bits"""
    position = 0
    while n:
        if n & 1:
            print(f"Bit {position} is set")
        n >>= 1
        position += 1

print("Set bits in 13 (0b1101):")
print_set_bits(13)

# Calculate log base 2 (floor)
def log2_floor(n):
    """Calculate floor(log2(n))"""
    if n <= 0:
        return None
    log = 0
    while n > 1:
        n >>= 1
        log += 1
    return log

print(f"log2(16) = {log2_floor(16)}")  # 4
print(f"log2(100) = {log2_floor(100)}")  # 6`
    },
    {
      name: 'Common Bit Tricks',
      icon: '🎯',
      explanation: `Frequently used bit manipulation patterns and tricks:

• **Power of 2**:
  - Check: n & (n-1) == 0
  - n-1 flips all trailing 1s and rightmost 0

• **Count Set Bits**:
  - Brian Kernighan's: n &= (n-1) removes rightmost 1
  - Python built-in: bin(n).count('1')

• **Rightmost Set Bit**:
  - Get: n & -n
  - Uses two's complement property

• **Clear Rightmost 1**:
  - n & (n-1)

• **Toggle Bit**:
  - n ^ (1 << pos)

• **Isolate Rightmost 0**:
  - ~n & (n+1)

• **All bits after rightmost 0**:
  - ~n & (n+1) - 1`,
      codeExample: `# Check if power of 2
def is_power_of_2(n):
    """Only one bit set if power of 2"""
    return n > 0 and (n & (n - 1)) == 0

print(f"8 is power of 2: {is_power_of_2(8)}")    # True
print(f"10 is power of 2: {is_power_of_2(10)}")  # False
print(f"16 is power of 2: {is_power_of_2(16)}")  # True

# Why it works:
# 8  = 0b1000
# 7  = 0b0111
# 8 & 7 = 0b0000 = 0

# Count set bits (Brian Kernighan's Algorithm)
def count_set_bits(n):
    """Count number of 1 bits"""
    count = 0
    while n:
        n &= (n - 1)  # Removes rightmost 1 bit
        count += 1
    return count

print(f"Set bits in 15: {count_set_bits(15)}")  # 4 (0b1111)
print(f"Set bits in 13: {count_set_bits(13)}")  # 3 (0b1101)

# Alternative: use Python's bin()
print(f"Set bits in 15: {bin(15).count('1')}")  # 4

# Get rightmost set bit
def rightmost_set_bit(n):
    """Isolate rightmost 1 bit"""
    return n & -n

print(f"Rightmost bit of 12: {bin(rightmost_set_bit(12))}")  # 0b100 (pos 2)
print(f"Rightmost bit of 10: {bin(rightmost_set_bit(10))}")  # 0b10 (pos 1)

# Why it works:
# n  = 12 = 0b1100
# -n = -12 = 0b...11110100 (two's complement)
# n & -n = 0b0100 = 4

# Toggle bit
def toggle_bit(n, pos):
    """Toggle bit at position"""
    return n ^ (1 << pos)

num = 5  # 0b0101
print(f"Toggle bit 1 of {bin(num)}: {bin(toggle_bit(num, 1))}")  # 0b0111
print(f"Toggle bit 0 of {bin(num)}: {bin(toggle_bit(num, 0))}")  # 0b0100

# Check if bit is set
def is_bit_set(n, pos):
    """Check if bit at position is 1"""
    return (n & (1 << pos)) != 0

print(f"Bit 0 of 5: {is_bit_set(5, 0)}")  # True (0b0101)
print(f"Bit 1 of 5: {is_bit_set(5, 1)}")  # False
print(f"Bit 2 of 5: {is_bit_set(5, 2)}")  # True

# Clear all bits from MSB to position (inclusive)
def clear_bits_msb_to_i(num, i):
    """Clear bits from most significant to position i"""
    mask = (1 << i) - 1
    return num & mask

num = 0b11111111  # 255
result = clear_bits_msb_to_i(num, 4)
print(f"Clear MSB to bit 4 of {bin(num)}: {bin(result)}")  # 0b1111

# Clear all bits from position to LSB (inclusive)
def clear_bits_i_to_lsb(num, i):
    """Clear bits from position i to least significant"""
    mask = ~((1 << (i + 1)) - 1)
    return num & mask

num = 0b11111111  # 255
result = clear_bits_i_to_lsb(num, 3)
print(f"Clear bit 3 to LSB of {bin(num)}: {bin(result)}")  # 0b11110000

# Update bit at position
def update_bit(num, pos, value):
    """Set bit at position to value (0 or 1)"""
    mask = ~(1 << pos)  # Clear the bit
    return (num & mask) | (value << pos)  # Set to new value

num = 0b1010
print(f"Original: {bin(num)}")
num = update_bit(num, 1, 1)  # Set bit 1 to 1
print(f"Set bit 1: {bin(num)}")  # 0b1010 (no change, already 1)
num = update_bit(num, 0, 1)  # Set bit 0 to 1
print(f"Set bit 0: {bin(num)}")  # 0b1011

# Get bit at position
def get_bit(num, pos):
    """Get bit value at position"""
    return (num >> pos) & 1

num = 0b1010
for i in range(4):
    print(f"Bit {i} of {bin(num)}: {get_bit(num, i)}")

# Clear rightmost set bit
def clear_rightmost_bit(n):
    """Clear rightmost 1 bit"""
    return n & (n - 1)

num = 0b1010  # 10
result = clear_rightmost_bit(num)
print(f"Clear rightmost of {bin(num)}: {bin(result)}")  # 0b1000

# Set rightmost unset bit
def set_rightmost_zero(n):
    """Set rightmost 0 bit to 1"""
    return n | (n + 1)

num = 0b1010  # 10 (rightmost 0 is at position 0)
result = set_rightmost_zero(num)
print(f"Set rightmost 0 of {bin(num)}: {bin(result)}")  # 0b1011

# Check if has adjacent bits
def has_adjacent_bits(n):
    """Check if number has adjacent 1 bits"""
    return (n & (n << 1)) != 0

print(f"3 (0b11) has adjacent bits: {has_adjacent_bits(3)}")    # True
print(f"5 (0b101) has adjacent bits: {has_adjacent_bits(5)}")   # False
print(f"6 (0b110) has adjacent bits: {has_adjacent_bits(6)}")   # True`
    },
    {
      name: 'LeetCode Patterns',
      icon: '💡',
      explanation: `Common bit manipulation patterns in coding problems:

• **Single Number**: XOR all elements (duplicates cancel)
• **Power of Two/Four**: Use n & (n-1) check
• **Hamming Weight**: Count 1 bits
• **Reverse Bits**: Shift and combine
• **Missing Number**: XOR all numbers and indices
• **Subsets**: Use bitmask to represent combinations
• **Gray Code**: XOR with right shift
• **Bitwise AND Range**: Clear differing bits

• **Complexity**: Most operations are O(1) or O(log n)
• **Space**: Usually O(1)`,
      codeExample: `# Pattern 1: Single Number (Easy)
# All elements appear twice except one
def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num  # Duplicates cancel out
    return result

print(singleNumber([4, 1, 2, 1, 2]))  # 4
print(singleNumber([2, 2, 1]))        # 1

# Pattern 2: Hamming Weight / Number of 1 Bits
def hammingWeight(n):
    count = 0
    while n:
        n &= (n - 1)  # Clear rightmost 1 bit
        count += 1
    return count

print(f"Hamming weight of 11: {hammingWeight(11)}")  # 3 (0b1011)
print(f"Hamming weight of 128: {hammingWeight(128)}")  # 1 (0b10000000)

# Pattern 3: Reverse Bits
def reverseBits(n):
    result = 0
    for i in range(32):
        result <<= 1        # Shift result left
        result |= (n & 1)   # Add rightmost bit of n
        n >>= 1             # Shift n right
    return result

# Test with 8-bit for clarity
n = 0b00000011  # 3
reversed = reverseBits(n) & 0xFF  # Mask to 8 bits
print(f"Reverse of {bin(n)}: {bin(reversed)}")  # 0b11000000

# Pattern 4: Power of Two
def isPowerOfTwo(n):
    return n > 0 and (n & (n - 1)) == 0

print(f"16 is power of 2: {isPowerOfTwo(16)}")  # True
print(f"18 is power of 2: {isPowerOfTwo(18)}")  # False

# Pattern 5: Power of Four
def isPowerOfFour(n):
    # Must be power of 2 AND 1 bits only at odd positions
    # 0x55555555 = 0b01010101010101010101010101010101
    return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) != 0

print(f"4 is power of 4: {isPowerOfFour(4)}")    # True
print(f"8 is power of 4: {isPowerOfFour(8)}")    # False
print(f"16 is power of 4: {isPowerOfFour(16)}")  # True

# Pattern 6: Missing Number
def missingNumber(nums):
    """Find missing number in range [0, n]"""
    n = len(nums)
    xor = 0
    # XOR all indices
    for i in range(n + 1):
        xor ^= i
    # XOR all values
    for num in nums:
        xor ^= num
    return xor

print(missingNumber([0, 1, 3, 4, 5]))  # 2
print(missingNumber([3, 0, 1]))        # 2

# Pattern 7: Subsets using Bitmask
def subsets(nums):
    """Generate all subsets using bit manipulation"""
    n = len(nums)
    result = []
    # Generate all 2^n combinations
    for mask in range(1 << n):  # 2^n iterations
        subset = []
        for i in range(n):
            if mask & (1 << i):  # Check if i-th bit is set
                subset.append(nums[i])
        result.append(subset)
    return result

print(subsets([1, 2, 3]))
# [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]

# Pattern 8: Sum of Two Integers (without +/- operators)
def getSum(a, b):
    """Add two integers without + or - operators"""
    mask = 0xFFFFFFFF  # 32-bit mask
    while b != 0:
        carry = (a & b) << 1  # Calculate carry
        a = (a ^ b) & mask     # Sum without carry
        b = carry & mask       # Update b to carry
    # Handle negative numbers
    return a if a <= 0x7FFFFFFF else ~(a ^ mask)

print(f"1 + 2 = {getSum(1, 2)}")      # 3
print(f"5 + 7 = {getSum(5, 7)}")      # 12

# Pattern 9: Hamming Distance
def hammingDistance(x, y):
    """Count bits that differ between x and y"""
    xor = x ^ y
    count = 0
    while xor:
        count += xor & 1
        xor >>= 1
    return count

print(f"Hamming distance(1, 4): {hammingDistance(1, 4)}")  # 2

# Pattern 10: Counting Bits
def countBits(n):
    """Count 1 bits for all numbers from 0 to n"""
    result = [0] * (n + 1)
    for i in range(1, n + 1):
        result[i] = result[i >> 1] + (i & 1)
    return result

print(f"Count bits 0 to 5: {countBits(5)}")  # [0,1,1,2,1,2]

# Pattern 11: Maximum XOR of Two Numbers
def findMaximumXOR(nums):
    """Find maximum XOR of any two numbers in array"""
    max_xor = 0
    mask = 0
    for i in range(31, -1, -1):
        mask |= (1 << i)
        prefixes = {num & mask for num in nums}
        candidate = max_xor | (1 << i)
        for prefix in prefixes:
            if candidate ^ prefix in prefixes:
                max_xor = candidate
                break
    return max_xor

print(f"Max XOR: {findMaximumXOR([3,10,5,25,2,8])}")  # 28

# Pattern 12: Divide Two Integers (without /, *, %)
def divide(dividend, divisor):
    """Divide using bit manipulation"""
    if dividend == -2147483648 and divisor == -1:
        return 2147483647

    negative = (dividend < 0) != (divisor < 0)
    dividend, divisor = abs(dividend), abs(divisor)

    quotient = 0
    while dividend >= divisor:
        temp, multiple = divisor, 1
        while dividend >= (temp << 1):
            temp <<= 1
            multiple <<= 1
        dividend -= temp
        quotient += multiple

    return -quotient if negative else quotient

print(f"10 / 3 = {divide(10, 3)}")    # 3
print(f"7 / -3 = {divide(7, -3)}")    # -2`
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={onBack}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Python
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              ⚙️ Bitwise Operations in Python
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {concepts.map((concept, index) => (
            <div
              key={index}
              onClick={() => setSelectedConcept(concept)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: '2px solid #3b82f6',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#60a5fa'
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {concept.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '0.75rem',
                color: '#93c5fd'
              }}>
                {concept.name}
              </h3>
              <p style={{
                color: '#d1d5db',
                textAlign: 'center',
                fontSize: '0.875rem'
              }}>
                Click to explore bitwise operations and techniques
              </p>
            </div>
          ))}
        </div>

        {selectedConcept && (
          <div style={{
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: '50',
            overflowY: 'auto'
          }}>
            <div style={{
              background: 'linear-gradient(to bottom right, #111827, #1f2937)',
              borderRadius: '0.75rem',
              maxWidth: '72rem',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '2px solid #3b82f6',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{
                position: 'sticky',
                top: '0',
                background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
                padding: '1.5rem',
                borderTopLeftRadius: '0.75rem',
                borderTopRightRadius: '0.75rem',
                borderBottom: '2px solid #60a5fa',
                zIndex: '10'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <span style={{ fontSize: '3rem' }}>{selectedConcept.icon}</span>
                    <h2 style={{
                      fontSize: '1.875rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      {selectedConcept.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedConcept(null)}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '1rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#b91c1c'
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#dc2626'
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{
                  background: '#1f2937',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '1px solid #3b82f6'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#93c5fd'
                  }}>
                    Overview
                  </h3>
                  <div style={{
                    color: '#d1d5db',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.625'
                  }}>
                    {selectedConcept.explanation}
                  </div>
                </div>

                <div style={{
                  background: '#1f2937',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  border: '1px solid #3b82f6'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#93c5fd'
                  }}>
                    Code Examples
                  </h3>
                  {parseCodeSections(selectedConcept.codeExample).map(
                    (section, idx) => (
                      <div key={section.id} style={{ marginBottom: '1rem' }}>
                        <div
                          style={{
                            width: '100%',
                            background: '#2563eb',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            marginBottom: '0.5rem',
                            textAlign: 'left',
                            fontWeight: '500',
                            fontSize: '1rem'
                          }}
                        >
                          Code Block {idx + 1}
                        </div>
                        <SyntaxHighlighter
                          language="python"
                          style={vscDarkPlus}
                          customStyle={{
                            padding: '1.5rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.9rem',
                            border: '1px solid #3b82f6'
                          }}
                        >
                          {section.code}
                        </SyntaxHighlighter>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BitwiseOperations
