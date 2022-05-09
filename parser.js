let mtn = `Congrats!
You have received N5000 airtime from 0903652222,
via MTN Share.`;

let airtel = `Txn Id R220502.2141.2100e3 to recharge 200 NGN from 8086594417 is successful. New balance is 200 NGN, validity till 25/01/25 & grace till 0.To see Airtime Bonus,pls call *223#.`;

let mobile = `09095€ subscriber
transferred 600.00 Naira
to vou. Your new balance is
700 Naira now.`;

let glo = `100.00NGN transfered to your account from MSISDN 08054914518`;

function parse() {
    let error = {
        amount: null,
        sender: null,
        error: true,
        status: "declined",
        network: ""
    }
    this.mtn = function(message) {
        let msg = message.trim().toLowerCase();
        // Validate Message
        if(!msg.includes("you have received") && !msg.includes("airtime from") && !msg.includes("mtn share")){
            return error;
        }
        
        let from = msg.indexOf("received ");
        if (!from) {
            return error;
        }
        from += 10;
        let to = msg.indexOf("airtime from ");
        if (!to) {
            return error;
        }
        let amount = Number(msg.substring(from, to).trim());
        from = msg.indexOf("from ");
        if (!from) {
            return error;
        }
        from += 5;
        to = msg.indexOf(",");
        if (!to) {
            return error;
        }
        let sender = msg.substring(from, to).trim();
        let obj = {
            amount,
            sender,
            error: false,
            status: "approved",
            network: "MTN"
        }
        return obj;
    }
    this.airtel = function(message) {
        let msg = message.trim().toLowerCase();
        // Validate Message
        if(!msg.includes("is successful") && !msg.includes("new balance is") && !msg.includes("validity till")){
            return error;
        }
        
        let from = msg.indexOf("to recharge");
        if (!from) {
            return error;
        }
        from += 12;
        to = msg.indexOf(" ngn from");
        if (!to) {
            return error;
        }
        let amount = Number(msg.substring(from, to).trim());
        from = msg.indexOf("ngn from ");
        if (!from) {
            return error;
        }
        from += 9;
        to = msg.indexOf("is successful");
        if (!to) {
            return error;
        }
        let sender = "0" + msg.substring(from, to).trim();
        from = msg.indexOf("balance is");
        if (!from) {
            return error;
        }
        from += 10;
        to = msg.indexOf("ngn, validity");
        if (!to) {
            return error;
        }
        let balance = Number(msg.substring(from, to));
        let obj = {
            amount,
            sender,
            balance,
            error: false,
            status: "approved",
            network: "Airtel"
        }
        return obj;
    }
    this.glo = function(message) {
        let msg = message.trim().toLowerCase();
        // Validate Message
        if(!msg.includes("ngn transfered to your account from msisdn")){
            return error;
        }
        
        let from = 0;
        let to = msg.indexOf("ngn transfered");
        if (!to) {
            return error;
        }
        let amount = Number(Number(msg.substring(from, to).trim()) + "");
        from = msg.indexOf("msisdn ");
        if (!from) {
            return error;
        }
        from += 7;
        let sender = msg.substring(from).trim();
        let obj = {
            amount,
            sender,
            error: false,
            status: "approved",
            network: "GLO"
        }
        return obj;
    }
    this.mobile = function(message) {
        let msg = message.trim().toLowerCase();
        // Validate Message
        if(!msg.includes("to you") && !msg.includes("new balance is") && !msg.includes("naira now")){
            return error;
        }
        
        let from = msg.indexOf("transferred ");
        if (!from) {
            return error;
        }
        from += 12;
        let to = msg.indexOf("naira to");
        let amount = Number(Number(msg.substring(from, to).trim()) + "");
        from = 0
        to = msg.indexOf("subscriber");
        let sender = msg.substring(from, to).trim();
        from = msg.indexOf("balance is ");
        if (!from) {
            return error;
        }
        from += 11;
        to = msg.indexOf("naira now");
        if (!to) {
            return error;
        }
        let balance = Number(msg.substring(from, to));
        let obj = {
            amount,
            sender,
            balance,
            error: false,
            status: "approved",
            network: "9mobile"
        }
        return obj;
    }
}

let parser = new parse();

module.exports = parser;