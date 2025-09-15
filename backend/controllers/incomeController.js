const xlsx = require("xlsx")
const Income = require("../models/Income")


// Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user._id; // Get user ID from authenticated request

    try {
        const { icon, source, amount, date } = req.body;
        // Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Create the Income document
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: date ? new Date(date) : new Date(), // Use provided date or current date
        });

        await newIncome.save();
        
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error : error.message });
    }
}

// Get All Income Source
exports.getAllIncome = async (req, res) => {
    const userId = req.user._id; // Get user ID from authenticated request

    try {
        // Find all income sources for the user
        const incomeSources = await Income.find({ userId }).sort({ date: -1 });

        if (incomeSources.length === 0) {
            return res.status(404).json({ message: "No income sources found" });
        }

        res.status(200).json(incomeSources);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching income sources", error: error.message });
    }
}

// Delete Income Source
exports.deleteIncome = async (req, res) => {

    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income source deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error deleting income source", error: error.message });
    }
}

// Download Income Source
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id; // Get user ID from authenticated request
    try {
        const incomeSources = await Income.find({ userId }).sort({ date: -1 });
        if (incomeSources.length === 0) {
            return res.status(404).json({ message: "No income sources found" });
        }

        const excelData = incomeSources.map(income => ({
            Source: income.source,
            Amount: income.amount,
            Date: income.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            Icon: income.icon || "No Icon"
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