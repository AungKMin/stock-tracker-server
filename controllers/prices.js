import yahooFinance from "yahoo-finance";

export const getPrices = async (req, res) => { 

    const { symbol } = req.query;

    try { 
        const thirtyDaysAgo = new Date(new Date().getTime() - 1000*3600*24*44); // get date thirty + (30/5) * 2 + 2 days ago
        const from = `${thirtyDaysAgo.getFullYear()}-${(thirtyDaysAgo.getMonth() + 1).toString().length > 1 ? (thirtyDaysAgo.getMonth() + 1) : '0' + (thirtyDaysAgo.getMonth() + 1)}-${thirtyDaysAgo.getDate().toString().length > 1 ? thirtyDaysAgo.getDate() : '0' + thirtyDaysAgo.getDate()}`
        const now = new Date();
        const to = `${now.getFullYear()}-${(now.getMonth().toString() + 1).length > 1 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)}-${now.getDate().toString().length > 1 ? now.getDate() : '0' + now.getDate()}`
        const data = await yahooFinance.historical({
            symbol: symbol,
            from: from,
            to: to
        });
        res.status(200).json({ data })
    } catch (error) { 
        res.status(500).json({ message: error.message });
        console.log(error);
    }

} 