contract Coin {

    address public minter;
    mapping (address => uint) public balances;
    string[2] greetings;

    event Sent(address from, address to, uint amount);

    function Coin() {
        minter = msg.sender;
        greetings[1] = "buddy";
    }

    function mint(address receiver, uint amount) {
        if (msg.sender != minter) return;
        balances[receiver] += amount;
    }

    function send(address receiver, uint amount){
        if (balances[msg.sender] < amount) return;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Sent(msg.sender, receiver, amount);
    }

   function greet(string _greeting) returns(string) {
      // newgreeting = _greeting + " buddy";
      return "hi";
   }
}
