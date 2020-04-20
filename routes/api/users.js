const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

// @route   POST api/users
// @desc    Register user
// @acess   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 characters minimum').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      // See if user exist
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exist' }] })
      }

      // Get user gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      user = new User({ name, email, password, avatar })

      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      // Return JSON-web-token

      res.send('User registered')
    } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
