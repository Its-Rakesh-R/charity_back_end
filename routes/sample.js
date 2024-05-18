router.post('/', async (req, res) => {
    try {
        const { names, values } = req.body;

        // Assuming 'names' and 'values' are arrays of equal length
        if (!Array.isArray(names) || !Array.isArray(values) || names.length !== values.length) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        const donationData = names.map((name, index) => ({
            name,value: values[index],
        }));

        // Insert multiple documents into the 'donation' collection
        const result = await client.db('charity').collection('donation').insertMany(donationData);

        res.status(201).json({ message: 'Data stored successfully', insertedCount: result.insertedCount });
    } catch (error) {
        console.error('Error storing data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
