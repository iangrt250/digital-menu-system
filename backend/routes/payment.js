// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController'); // Fixed path

router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
