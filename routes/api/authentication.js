const appConfig = require('../../config.js');
const crypto = require('crypto');
const express = require('express');
const mailgun = require('mailgun-js')({
    apiKey: appConfig.mailgun.apiKey,
    domain: appConfig.mailgun.domain,
});
const passport = require('passport');
const User = require('../../models/user');

const router = express.Router();

router.get('/checkSession', (req, res) => {
    if (req.user) {
        return res.send(JSON.stringify(req.user));
    }
    return res.send(JSON.stringify({}));
});

router.get('/logout', (req, res) => {
    req.logout();
    return res.send(JSON.stringify(req.user));
});

router.post('/login', async (req, res) => {
    // look up the user by their email
    const query = User.findOne({ email: req.body.email });
    const foundUser = await query.exec();

    // if they exist, they'll have a username, so add that to our body
    if (foundUser) { req.body.username = foundUser.username; }

    passport.authenticate('local')(req, res, () => {
        // If logged in, we should have user info to send back
        if (req.user) {
            return res.send(JSON.stringify(req.user));
        }

        // Otherwise return an error
        return res.send(JSON.stringify({ error: 'There was an error logging in' }));
    });
});

router.post('/register', async (req, res) => {

    // First, check and make sure the email doesn't already exist
    const query = User.findOne({ email: req.body.email });
    const foundUser = await query.exec();
    if (foundUser) { return res.send(JSON.stringify({ error: 'Email or username already exists' })); }


    if (!foundUser) {
        // Create a user object to save, using values from incoming JSON
        const newUser = new User(req.body);

        // Save, via passport's "register" method, the user
        return User.register(newUser, req.body.password, (err, user) => {
            // If there's a problem, send back a JSON object with the error
            if (err) {
                return res.send(JSON.stringify({ error: err }));
            }
            // Otherwise log them in
            return passport.authenticate('local')(req, res, () => {
                // If logged in, we should have user info to send back
                if (req.user) {
                    return res.send(JSON.stringify(req.user));
                }
                // Otherwise return an error
                return res.send(JSON.stringify({ error: 'There was an error while registering the user' }));
            });
        });
    }
    // return an error if all else fails
    return res.send(JSON.stringify({ error: 'There was an error while registering the user' }));
});

router.post('/savepassword', async (req, res) => {
    let result;
    try {
        // look up user in the DB based on reset hash
        const query = User.findOne({ passwordReset: req.body.hash });
        const foundUser = await query.exec();

        // If the user exists save their new password
        if (foundUser) {
            // user passport's built-in password set method
            foundUser.setPassword(req.body.password, (err) => {
                if (err) {
                    result = res.send(JSON.stringify({ error: 'Password could not be saved. Please try again' }));
                } else {
                    // once the password's set, save the user object
                    foundUser.save((error) => {
                        if (error) {
                            result = res.send(JSON.stringify({ error: 'Password could not be saved. Please try again' }));
                        } else {
                            // Send a success message
                            result = res.send(JSON.stringify({ success: true }));
                        }
                    });
                }
            });
        }
        else {
            result = res.send(JSON.stringify({ error: 'There was an error connecting to the database.' }));
        }
    } catch (err) {
        // if the hash didn't bring up a user, error out
        result = res.send(JSON.stringify({ error: 'Reset hash not found in database' }));
    }
    return result;
});

router.post('/saveresethash', async (req, res) => {
    let result;
    try {
        // check and make sure the email exists
        const query = User.findOne({ email: req.body.email });
        const foundUser = await query.exec();

        // If the user exists, save their password hash
        const timeInMs = Date.now();
        const hashString = `${req.body.email}${timeInMs}`;
        const secret = appConfig.crypto.secret;
        const hash = crypto.createHmac('sha256', secret)
            .update(hashString)
            .digest('hex');
        foundUser.passwordReset = hash;

        foundUser.save((err) => {
            if (err) { result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' })); }

            // Puting together the email
            const emailData = {
                from: `Euphony <malladi.s@${appConfig.mailgun.domain}>`,
                to: foundUser.email,
                subject: 'Reset Your Password',
                text: `A password reset has been requested for the Euphony account connected to this email address. If you made this request, please click the following link: http://localhost:3000/account/change-password/${foundUser.passwordReset} ... if you didn't make this request, feel free to ignore it!`,
                html: `<p>A password reset has been requested for the Euphony account connected to this email address. If you made this request, please click the following link: <a target="_blank" href="http://localhost:3000/account/change-password/${foundUser.passwordReset}">http://localhost:3000/account/change-password/${foundUser.passwordReset}</a>.</p><p>If you didn't make this request, feel free to ignore it!</p>`,
            };

            // Send it
            mailgun.messages().send(emailData, (error, body) => {
                if (error || !body) {
                    result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to send the email. Please try again.' }));
                } else {
                    result = res.send(JSON.stringify({ success: true }));
                }
            });
        });
    } catch (err) {
        // if the user doesn't exist, error out
        result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' }));
    }
    return result;
});

module.exports = router;