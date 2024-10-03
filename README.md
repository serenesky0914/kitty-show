# Kitty show Back-end
## Getting Started
### Prerequisites
- Ensure you have the following installed:
    - Python 3.9 or later
    - PostgreSQL
### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/bla/alalala
    cd afaf
2. Set up a virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
3. Install backend dependencies:
    ```bash
    pip install -r requirements.txt
4. Set up the PostgreSQL database:

    Make sure you have PostgreSQL installed and running. Create a new database and update the database configuration in your code as needed.
5. Run the application:
    ```bash
    uvicorn app:app --reload
### API endpoints
- ```POST /documents``` - Create a new document
- ```GET /documents``` - Retrieve all documents
- ```PUT /documents/{id}``` - Update an existing document
- ```DELETE /documents/{id}``` - Delete a document



# Kitty Show Front-end

You can run the project using following cmd

### Install

```
npm install
```

### Run project

```
npm run dev
```
You can run and check the result http://localhost:5174/
### Run storybook
```
npm run storybook
```
You can check the result http://localhost:6006/