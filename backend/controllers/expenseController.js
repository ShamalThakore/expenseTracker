const xlsx = require("xlsx")
const Expense = require("../models/Expense")


// Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user._id; // Get user ID from authenticated request

    try {
        const { icon, category, amount, date } = req.body;
        // Validation: Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Create the Expense document
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: date ? new Date(date) : new Date(), // Use provided date or current date
        });

        await newExpense.save();
        
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error : error.message });
    }
}

// Get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id; // Get user ID from authenticated request

    try {
        // Find all Expense sources for the user
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        if (expense.length === 0) {
            return res.status(404).json({ message: "No Expense sources found" });
        }

        res.status(200).json(expense);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching Expense sources", error: error.message });
    }
}

// Delete Expense Source
exports.deleteExpense = async (req, res) => {

    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense source deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting expense source", error: error.message });
    }
}

// Download Expense Source
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id; // Get user ID from authenticated request
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        if (expense.length === 0) {
            return res.status(404).json({ message: "No expense sources found" });
        }

        const excelData = expense.map(item => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            Icon: item.icon || "No Icon"
        }));


        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(excelData);
        xlsx.utils.book_append_sheet(wb, ws, 'Income Sources');

        const filePath = `./income_sources_${userId}.xlsx`;
        xlsx.writeFile(wb, filePath);

        res.download(filePath, 'income_sources.xlsx', (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).send("Error downloading file");
            }
        });

    } catch (error) {

        res.status(500).json({ message: "Error downloading income sources", error: error.message });
    }

}