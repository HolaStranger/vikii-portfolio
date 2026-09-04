with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<span class=\"chip k\">Power Automate</span>', '<span class=\"chip k\">ChromaDB</span>\n                <span class=\"chip k\">OpenAI</span>\n                <span class=\"chip k\">Power Automate</span>')

content = content.replace('<span class=\"chip k\">Node.js</span>', '<span class=\"chip k\">FastAPI</span>\n                <span class=\"chip k\">Node.js</span>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
