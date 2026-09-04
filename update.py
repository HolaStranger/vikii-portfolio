import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('17</div>\n                <div class=\"hsl\">Projects</div>', '18</div>\n                <div class=\"hsl\">Projects</div>')

for i in range(17, 0, -1):
    old_p = f'P-{i:02d}'
    new_p = f'P-{i+1:02d}'
    content = content.replace(old_p, new_p)
    content = content.replace(f'Project {i:02d}', f'Project {i+1:02d}')

new_project = '''          <!-- Project 01 (Featured) -->
          <div class=\"pc ft rev\" data-c=\"fs bot\">
            <span class=\"pnum\">P-01 &middot; 2024 &middot; Full Stack &middot; AI Powered</span>
            <div class=\"pico\">&#x1F4DD;</div>
            <div class=\"pname\">RESUFIT | AI RESUME MATCHER</div>
            <div class=\"pdesc\">
              <ul>
                <li>Built an AI-powered tool that analyzes job descriptions against resumes using a retrieval-augmented generation (RAG) pipeline.</li>
                <li>Chunked and embedded resume content with sentence-transformers and ChromaDB, semantically matching experience to JD requirements instead of relying on keyword search.</li>
                <li>Scored fit per requirement and flagged genuine skill gaps versus keyword phrasing differences.</li>
                <li>Generated evidence-based bullet rewrites using GPT-4o-mini, strictly constrained to real documented experience with no hallucinated skills.</li>
                <li>Produced a tailored resume and a first draft cover letter for each job application.</li>
                <li>Built the RAG pipeline from scratch in Python without LangChain, to maintain full control over retrieval logic and prompts.</li>
              </ul>
            </div>
            <div class=\"pstack\">
              <span class=\"stk\">ChromaDB</span>
              <span class=\"stk\">OpenAI</span>
              <span class=\"stk\">FastAPI</span>
              <span class=\"stk\">React</span>
              <span class=\"stk\">TypeScript</span>
            </div>
            <div class=\"p-links\">
              <a href=\"https://github.com/HolaStranger/ResuFit\" class=\"plink\" target=\"_blank\">&#x1F4BB; Source Code</a>
            </div>
            <div class=\"parr\">&#x2197;</div>
          </div>

'''

content = content.replace('<div class=\"pgrid\">\n', '<div class=\"pgrid\">\n' + new_project)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
