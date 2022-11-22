const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');

const port = 5050 || process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

// DB connection
const db = new sqlite3.Database('./db/Nortwind.db', err => {
  if (err) {
    console.error("Error opening database " + err.message);
  }
});

// GET: ALL Categories
app.get("/api/categories", (req, res) => {
  db.all(`SELECT CategoryID, CategoryName, Description FROM Categories`, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

// GET: ALL Customers
app.get("/api/customers", (req, res) => {
  db.all(`SELECT * FROM Customers`, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

// GET: ALL Employees
app.get("/api/employees", (req, res) => {
  db.all(`SELECT EmployeeID, Title, LastName, FirstName, BirthDate, HireDate, Country FROM Employees`, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

// GET: ALL Products
app.get("/api/products", (req, res) => {
  db.all(`SELECT * FROM Products`, 
  (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.status(200).json(row);
  });
});

// GET: ALL Orders
app.get("/api/orders", (req, res) => {
  db.all(`SELECT * FROM Orders`, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

// GET: ALL Order Details
app.get("/api/orderdetails", (req, res) => {
  db.all(`SELECT * FROM OrderDetails`, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

// GET: ALL Suppliers
app.get("/api/suppliers", (req, res) => {
  db.all(`SELECT * FROM Suppliers`, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

// GET: ALL Shippers
app.get("/api/Shippers", (req, res) => {
  db.all(`SELECT * FROM Shippers`, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

// GET: ALL Customer have orders
app.get("/api/custorders", (req, res) => {
  const sql = `
  SELECT c.CustomerID, c.City, c.Country, o.OrderID 
  FROM Customers AS c, Orders AS o  
  WHERE c.CustomerID = o.CustomerID`;

  db.all(sql, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

// GET: BY Customer ID have orders
app.get("/api/custorders/:id", (req, res) => {
  const sql = `
  SELECT c.CustomerID, c.City, c.Country, o.OrderID 
  FROM Customers AS c, Orders AS o  
  WHERE c.CustomerID = '${req.params.id}' AND c.CustomerID = o.CustomerID`;

  db.all(sql, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

// GET: Employee have orders
app.get("/api/emporders", (req, res) => {
  const sql = `
  SELECT emp.EmployeeID, emp.City, emp.Country, o.OrderID 
  FROM Employees AS emp, Orders AS o  
  WHERE emp.EmployeeID = o.EmployeeID`;

  db.all(sql, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

// GET: BY Employee ID have orders
app.get("/api/emporders/:id", (req, res) => {
  const sql = `
  SELECT emp.EmployeeID, emp.City, emp.Country, o.OrderID 
  FROM Employees AS emp, Orders AS o  
  WHERE emp.EmployeeID = '${req.params.id}' AND emp.EmployeeID = o.EmployeeID`;

  db.all(sql, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

// GET: Product have orders details
app.get("/api/productorders", (req, res) => {
  const sql = `
  SELECT pro.ProductID, pro.ProductName, pro.UnitPrice, od.OrderID 
  FROM Products AS pro, OrderDetails AS od  
  WHERE pro.ProductID = od.ProductID`;

  db.all(sql, 
    (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).json(row);
    });
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});