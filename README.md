# 🥜 Food Allergy RAG System

> **An AI-powered Retrieval-Augmented Generation (RAG) system for answering food allergy questions using trusted clinical guidelines.**

Food allergies can be difficult to understand, especially when people need accurate information about symptoms, diagnosis, management, and treatment.

**Food Allergy RAG** is an intelligent question-answering system designed to provide reliable, context-based answers using information retrieved from trusted medical documentation rather than relying only on the language model's internal knowledge.

The system combines **document retrieval, semantic search, embeddings, and Large Language Models (LLMs)** to generate grounded answers and provide the **source document and page** used to answer each question.

---

## 🎯 Project Goal

The main goal of this project is to build a reliable AI assistant that can answer questions related to **food allergies** based on trusted medical information.

Instead of simply asking an LLM to generate an answer, our system follows a **Retrieval-Augmented Generation (RAG)** approach:

**User Question → Embedding → Semantic Retrieval → Relevant Chunks → LLM → Grounded Answer + Sources**

This helps reduce hallucinations and makes the generated answers more traceable and explainable.

---

## 📚 Knowledge Source

The system is built using trusted clinical documentation:

**NICE Clinical Guideline 116 — Food Allergy in Children and Young People**

The document contains clinical recommendations and information related to:

* Food allergy symptoms
* Diagnosis
* Assessment
* Management
* Treatment
* Prevention
* Referral
* Food allergy-related clinical recommendations

The document is processed and transformed into searchable text chunks before being indexed for retrieval.

---

## 🧠 What is RAG?

**Retrieval-Augmented Generation (RAG)** is an approach that combines information retrieval with Large Language Models.

Instead of generating an answer directly from the model's pretrained knowledge, the system first searches a knowledge base for relevant information.

### Traditional LLM

```text
User Question
      ↓
     LLM
      ↓
Generated Answer
```

### Our RAG System

```text
User Question
      ↓
Generate Query Embedding
      ↓
Semantic Search
      ↓
Retrieve Relevant Chunks
      ↓
Provide Context to LLM
      ↓
Generate Grounded Answer
      ↓
Answer + Source Citation
```

---

# 🔬 System Architecture

```text
                 ┌─────────────────────┐
                 │     User Question   │
                 └──────────┬──────────┘
                            ↓
                 ┌─────────────────────┐
                 │   Query Embedding   │
                 └──────────┬──────────┘
                            ↓
                 ┌─────────────────────┐
                 │    FAISS Search     │
                 └──────────┬──────────┘
                            ↓
                 ┌─────────────────────┐
                 │ Relevant Text       │
                 │ Chunks               │
                 └──────────┬──────────┘
                            ↓
                 ┌─────────────────────┐
                 │       LLM           │
                 │  Answer Generation  │
                 └──────────┬──────────┘
                            ↓
                 ┌─────────────────────┐
                 │ Answer + Sources    │
                 └─────────────────────┘
```

---

# ⚙️ RAG Pipeline

## 1. Document Parsing

The original PDF document is processed and converted into machine-readable text.

```text
PDF
 ↓
Text Extraction
 ↓
Clean Text
```

---

## 2. Text Cleaning

The extracted text is cleaned before chunking.

The preprocessing includes:

* Removing excessive spaces
* Removing unnecessary blank lines
* Cleaning formatting artifacts
* Normalizing the extracted text

---

## 3. Text Chunking

The document is divided into smaller chunks so that relevant information can be retrieved efficiently.

Our experiments included different chunk sizes and overlap values to evaluate retrieval quality.

Example configuration:

```python
chunk_size = 1500
chunk_overlap = 300
```

Chunking is important because very large chunks may contain too much irrelevant information, while very small chunks may lose important context.

---

## 4. Embeddings

Each chunk is converted into a numerical vector using a sentence embedding model.

The project experiments included:

* `all-MiniLM-L6-v2`
* `multi-qa-MiniLM-L6-cos-v1`

These embeddings allow the system to compare the semantic meaning of the user's question with the stored document chunks.

---

## 5. Vector Search

The generated embeddings are indexed using **FAISS**.

When the user asks a question:

```text
Question
   ↓
Question Embedding
   ↓
FAISS Similarity Search
   ↓
Top-K Relevant Chunks
```

The system retrieves the most semantically similar chunks.

For example:

```text
Top K = 5
```

This means the five most relevant chunks are retrieved and provided to the language model as context.

---

# 🤖 LLM Integration

After retrieving the most relevant chunks, the system sends them together with the user's question to a Large Language Model.

The LLM uses the retrieved information to generate the final answer.

The project supports integration with LLM APIs through **OpenRouter**.

The API key is stored securely and should **never be committed to GitHub**.

---

# 🔎 Retrieval Example

Example question:

```text
What are the symptoms of food allergy?
```

The retrieval system searches the vector database and returns the most relevant chunks.

Example:

```text
Rank 1
Chunk: 20
Similarity Score: 0.6912
Page: 21

Rank 2
Chunk: 26
Similarity Score: 0.6800
Page: 27

Rank 3
Chunk: 65
Similarity Score: 0.6651
Page: 66
```

The retrieved context is then passed to the LLM to generate a grounded response.

---

# 📊 Retrieval Evaluation

To evaluate the quality of the retrieval system, we use retrieval metrics such as:

### Precision@K

Precision@K measures how many of the retrieved documents/chunks among the top K results are relevant to the user's question.

For example:

```text
K = 5

Relevant Retrieved Chunks = 4

Precision@5 = 4 / 5 = 0.80
```

Other evaluation metrics can be incorporated as the project develops, including:

* Recall@K
* MRR (Mean Reciprocal Rank)
* Hit Rate
* Similarity Score Analysis
* Answer Quality

---

# 🌍 Multilingual Support

The system is designed to support both:

🇬🇧 **English**

and

🇪🇬 **Arabic**

Users can ask questions in either language, with the goal of making medical information more accessible to a wider audience.

---

# ✨ Key Features

### 💬 AI Question Answering

Users can ask natural-language questions about food allergies.

### 🔎 Semantic Search

The system retrieves information based on meaning rather than exact keyword matching.

### 📖 Source Citations

Answers can be linked to the original document and relevant page.

### 🤖 Multiple AI Models

The interface can provide the ability to select the preferred AI model.

### 🌍 Arabic & English

Supports multilingual interaction.

### 📄 Open Document

Users can open the original document and navigate to the relevant page.

### 🔄 Translation

The system can support Arabic ↔ English translation.

### 💡 Recommendations

The system can provide useful recommendations based on the retrieved information while keeping the retrieved clinical context as the foundation.

---

# 🛠️ Technologies

| Technology            | Purpose                         |
| --------------------- | ------------------------------- |
| Python                | Core development                |
| Google Colab          | Development & experimentation   |
| PyMuPDF               | PDF text extraction             |
| Sentence Transformers | Text embeddings                 |
| FAISS                 | Vector similarity search        |
| OpenRouter            | LLM API integration             |
| NumPy                 | Numerical processing            |
| Regex                 | Text preprocessing              |
| Git & GitHub          | Version control & collaboration |

---

# 📁 Project Structure

```text
food-allergy-rag/
│
├── notebooks/
│   ├── food_allergy_rag.ipynb
│   ├── retrieval_evaluation.ipynb
│   └── ...
│
├── data/
│   └── README.md
│
├── src/
│   ├── preprocessing/
│   ├── embeddings/
│   ├── retrieval/
│   └── generation/
│
├── frontend/
│
├── evaluation/
│
├── README.md
├── requirements.txt
└── .gitignore
```

> The repository structure may evolve as the project develops.

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

```bash
cd food-allergy-rag
```

---

## 2. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 3. Configure API Key

Create an environment variable for your OpenRouter API key.

Example:

```python
OPENROUTER_API_KEY = "YOUR_API_KEY"
```

⚠️ **Never upload real API keys to GitHub.**

For Google Colab, use **Secrets** instead of hardcoding the key.

---

## 4. Run the Notebook

Open:

```text
notebooks/food_allergy_rag.ipynb
```

Run the notebook cells sequentially to reproduce the RAG pipeline.

---

# 👥 Team Collaboration

This project is developed collaboratively using GitHub.

Each team member can work on a separate branch:

```text
main
│
├── retrieval
├── frontend
├── evaluation
├── recommendation
└── documentation
```

Recommended workflow:

```text
Create Branch
      ↓
Develop Feature
      ↓
Commit Changes
      ↓
Push Branch
      ↓
Pull Request
      ↓
Code Review
      ↓
Merge into main
```

This workflow helps prevent conflicts and keeps the project organized.

---

# 🔐 Security

Sensitive information must never be committed to the repository.

Do **NOT** upload:

```text
.env
API keys
Passwords
Private credentials
Personal information
```

The `.gitignore` file should include sensitive and unnecessary files.

Example:

```text
.env
*.env
__pycache__/
.ipynb_checkpoints/
```

---

# ⚠️ Medical Disclaimer

This project is intended for **educational and research purposes only**.

It is **not a substitute for professional medical advice, diagnosis, or treatment**.

Users should consult qualified healthcare professionals for medical decisions, especially in cases involving suspected or severe allergic reactions.

---

# 🔮 Future Improvements

Future versions of the project may include:

* 📷 Image-based allergy information extraction
* 🧠 Improved embedding models
* 🔎 Hybrid keyword + semantic retrieval
* 🧪 More comprehensive RAG evaluation
* 📊 Advanced evaluation dashboards
* 🗂️ Support for multiple medical documents
* 🔗 More detailed source citations
* 📄 Automatic document page navigation
* 🌍 Improved Arabic medical-language support
* 💬 Conversation history
* 🎙️ Voice-based questions
* 🚨 Emergency-aware responses for severe allergy symptoms

---

# 📈 Project Vision

Our vision is to build a reliable and explainable AI assistant that makes trusted food allergy information easier to access.

The project focuses not only on generating answers, but also on answering an important question:

> **"Where did this answer come from?"**

By combining **RAG, semantic retrieval, trusted clinical documentation, source citations, and multilingual interaction**, we aim to make the system more transparent, useful, and trustworthy.

---

# ⭐ Conclusion

**Food Allergy RAG** demonstrates how Retrieval-Augmented Generation can be used to build domain-specific AI systems grounded in trusted documentation.

The project brings together:

**Document Processing → Chunking → Embeddings → Vector Search → Retrieval → LLM → Answer Generation → Source Citation**

creating a complete AI pipeline for knowledge-grounded question answering.

---

## 👩‍💻 Team

Developed as a collaborative AI project using:

**Python • RAG • FAISS • Sentence Transformers • LLMs • GitHub**

---

### ⭐ If you find this project interesting, feel free to explore the repository and follow its development.
