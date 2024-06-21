const express = require('express');
const cmd = require('node-cmd');
const router = express.Router();

router.post('/perform-action', (req, res) => {
    const { action, selectedAction } = req.body;

    let command = '';
    if (action === 'ok') {
        switch (selectedAction) {
            case 'shutdown':
                command = 'shutdown /s /t 0';
                break;
            case 'restart':
                command = 'shutdown /r /t 0';
                break;
            case 'sleep':
                command = 'rundll32.exe powrprof.dll,SetSuspendState 0,1,0';
                break;
            case 'hibernate':
                command = 'shutdown /h';
                break;
            case 'logoff':
                command = 'shutdown /l';
                break;
            case 'lock':
                command = 'rundll32.exe user32.dll,LockWorkStation';
                break;
            default:
                command = '';
        }
    }

    if (command) {
        cmd.run(command, (err, data, stderr) => {
            if (err) {
                console.error('Command execution error:', err);
                res.status(500).json({ success: false, message: 'Command execution error' });
            } else {
                res.json({ success: true, message: 'Command executed successfully' });
            }
        });
    } else {
        res.json({ success: true, message: 'No action performed' });
    }
});

module.exports = router;
