#!/usr/bin/env python3
"""
Convert SystemDesign.jsx from topics format to questions format matching SlidingWindow.jsx
"""

import re
import json

def extract_topics(content):
    """Extract all topics from the systemDesignTopics array."""
    # Find the systemDesignTopics array
    topics_match = re.search(r'const systemDesignTopics = \[(.*?)\n  \]', content, re.DOTALL)

    if not topics_match:
        print("Could not find systemDesignTopics array")
        return []

    topics_str = topics_match.group(1)

    # Split by topic boundaries (looking for id: pattern at the beginning of a line)
    topic_blocks = re.split(r'\n    \{(?=\n      id: \d+)', topics_str)

    topics = []
    for block in topic_blocks:
        if not block.strip():
            continue

        # Add back the opening brace
        if not block.startswith('\n      id:'):
            block = '{\n      id:' + block.split('id:', 1)[1] if 'id:' in block else block
        else:
            block = '{' + block

        # Extract id
        id_match = re.search(r'id: (\d+)', block)
        if not id_match:
            continue
        topic_id = int(id_match.group(1))

        # Extract name
        name_match = re.search(r"name: '([^']+)'", block)
        name = name_match.group(1) if name_match else f"Topic {topic_id}"

        # Extract description
        desc_match = re.search(r"description: '([^']+)'", block)
        description = desc_match.group(1) if desc_match else ""

        # Extract explanation
        expl_match = re.search(r"explanation: '([^']+)'", block)
        explanation = expl_match.group(1) if expl_match else ""

        # Extract key points (find the array)
        keypoints_match = re.search(r'keyPoints: \[(.*?)\]', block, re.DOTALL)
        keypoints = []
        if keypoints_match:
            keypoints_str = keypoints_match.group(1)
            # Extract each quoted string
            keypoints = re.findall(r"'([^']+)'", keypoints_str)

        # Extract code example (find the template literal)
        code_match = re.search(r'codeExample: `(.*?)`\n', block, re.DOTALL)
        code_example = ""
        if code_match:
            code_example = code_match.group(1)

        topics.append({
            'id': topic_id,
            'title': name,
            'description': description,
            'explanation': explanation,
            'keyPoints': keypoints,
            'javaCode': code_example,
            'difficulty': 'Medium'  # Default difficulty
        })

    return topics

def main():
    input_file = '/mnt/c/Users/micha/Documents/dev/oct/my-app/src/pages/design/SystemDesign.jsx'

    print("Reading SystemDesign.jsx...")
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    print("Extracting topics...")
    topics = extract_topics(content)

    print(f"Found {len(topics)} topics:")
    for topic in topics:
        print(f"  {topic['id']}. {topic['title']}")
        print(f"     Description: {topic['description'][:60]}...")
        print(f"     Key Points: {len(topic['keyPoints'])} items")
        print(f"     Code Lines: {topic['javaCode'].count(chr(10)) + 1}")

    # Save topics as JSON for verification
    with open('system_design_topics.json', 'w', encoding='utf-8') as f:
        json.dump(topics, f, indent=2)

    print("\n✅ Topics extracted and saved to system_design_topics.json")
    print("   Ready for conversion to SlidingWindow format")

if __name__ == '__main__':
    main()
