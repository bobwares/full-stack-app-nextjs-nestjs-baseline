**Context**:  
Convert a JSON schema into normalized PostgreSQL `CREATE TABLE` statements.  
Tech: PostgreSQL 16, Plain SQL, Docker  
Env: { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, DATABASE_URL }  
Project: `<project-name>`  
Directory: `/db`

**Task**:  
Generate a migration in `db/migrations/20250610120000_create_order_tables.sql` that:
- Creates normalized tables from the JSON schema below
- Infers data types and constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE)
- Maps nested objects (`customer`, `shipping_address`) to separate tables
- Converts arrays (`items`) to a related table
- Includes a metadata header and smoke tests
- Adds sample INSERT statements

**JSON Schema**:
```json
{
  "order": {
    "id": "12345",
    "customer": {
      "id": "C789",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "items": [
      {
        "product_id": "P1",
        "name": "Laptop",
        "price": 999.99,
        "quantity": 1
      },
      {
        "product_id": "P2",
        "name": "Mouse",
        "price": 24.99,
        "quantity": 2
      }
    ],
    "shipping_address": {
      "street": "123 Main St",
      "city": "Boston",
      "state": "MA",
      "zip": "02108"
    }
  }
}
````


**Constraints**:
- File path: db/migrations/20250610120000_create_order_tables.sql  
- Use PostgreSQL v16 dialect  
- Normalize to at least 3NF  
- Use singular table names (e.g., customer, order_item)  
- Include indexes for foreign keys and queryable fields  
- Use CREATE TABLE IF NOT EXISTS  
- Follow project naming conventions  
- Include sample INSERT statements for testing  

**Output**:  
A complete SQL file with metadata header, table definitions, indexes, sample data inserts, and smoke tests.

