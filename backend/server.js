
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const { router: authRoutes } = require("./routes/auth");
const chatRouter             = require('./routes/chat');
const toolsRouter            = require('./routes/tools');
const progressRouter         = require('./routes/progress');
// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use('/api/chat',     chatRouter)
app.use('/api/tools',    toolsRouter)
app.use('/api/progress', progressRouter)

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ ok: true }))

app.get("/", (req, res) => {
  res.send("Backend working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
