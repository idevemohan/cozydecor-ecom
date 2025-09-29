const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const products = require("./products");
const nodemailer = require("nodemailer");


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 👉 Serve images statically
app.use("/images", express.static(path.join(__dirname, "public/images")));

// --- USERS FILE ---
const usersFile = path.join(__dirname, "users.json");

// Ensure users.json exists
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]));
}

// --- AUTH ROUTES ---
// Register
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const users = JSON.parse(fs.readFileSync(usersFile));
  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ message: "User registered successfully", user: newUser });
});

// Login
app.post("/api/auth/signin", (req, res) => {
  const { email, password } = req.body;

  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  res.json({ message: "Login successful", user });
});

// --- PRODUCTS ROUTES ---
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/category/:category", (req, res) => {
  const { category } = req.params;
  if (products[category]) {
    res.json(products[category]);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jayalakshmideve@gmail.com",   // replace with your Gmail
        pass: "fnhu bsir hnqf ujyo",      // Gmail App Password (not your normal password)
      },
      tls: {
    rejectUnauthorized: false, // 👈 bypass self-signed cert issue
  },
    });

    await transporter.sendMail({
      from: "jayalakshmideve@gmail.com",
      to: email,
      subject: "🎉 Subscription Successful!",
      text: `Hello! Thanks for subscribing to our newsletter. We'll keep you updated.`,
    });

    res.json({ success: true, message: "Confirmation email sent successfully" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});


// --- SEARCH PRODUCTS ---
app.get("/api/products/search", (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  try {
    let allProducts = [];

    // Flatten all category arrays
    Object.entries(products).forEach(([category, items]) => {
      if (Array.isArray(items)) {
        items.forEach((item) => {
          allProducts.push({ ...item, category }); // attach category
        });
      }
    });

    // Case-insensitive search on title, description, category
    const results = allProducts.filter((p) => {
      const titleMatch = p.title?.toLowerCase().includes(q.toLowerCase());
      const descMatch = p.description?.toLowerCase().includes(q.toLowerCase());
      const categoryMatch = p.category?.toLowerCase().includes(q.toLowerCase());
      return titleMatch || descMatch || categoryMatch;
    });

    console.log("Search query:", q, "| Results:", results.length);
    res.json(results);
  } catch (error) {
    console.error("❌ Search API error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
