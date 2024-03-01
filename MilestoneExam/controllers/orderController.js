const Order = require('../models/Order');
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = new twilio.Twilio(accountSid, authToken);


const createOrder = async (req, res) => {
    const userId = req.cookies.userId;
    const { food_id,  order_id, status } = req.body;
  
    try {
      const newOrder = new Order({
        food_id,
        user_id: userId, 
        order_id,
        status,
      });
  
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  
  
  const sendOTP = async (req, res) => {
    const { user_id, order_id } = req.params;
  
    try {
      // Generate OTP
      const otpCode = generateOTP();
  
      // Save OTP code in the database
      await Order.findOneAndUpdate(
        { user_id, order_id },
        { $set: { otp_code: otpCode } },
        { new: true }
      );
  
      // Send OTP via Twilio
      await sendOTPViaTwilio(user_id, otpCode);
  
      res.json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const generateOTP = () => {
    // Simple logic to generate a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  
  const sendOTPViaTwilio = async (user_id, otpCode) => {
    try {
      const user = await getUserById(user_id); // Implement this function to retrieve user details
      const phoneNumber = user.phoneNumber; // Assuming you have a phoneNumber field in your user model
  
      // Send OTP message via Twilio
      const message = await twilioClient.messages.create({
        body: `Your OTP for order verification is: ${otpCode}`,
        from: YOUR_TWILIO_PHONE_NUMBER, // Replace with your Twilio phone number
        to: phoneNumber,
      });
  
      console.log(`OTP message sent to ${phoneNumber}: ${message.sid}`);
    } catch (error) {
      throw error;
    }
  };       
  
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  sendOTP
};
