// import './stuff.sol';

contract Registrar{
    event log(string msg);
    event itemadded(string msg);
    event registrationcomplete(address msg);

    address owner;
    modifier onlyowner { if (msg.sender == owner) _ }

    struct Stuff {
        uint numItems;
        mapping (string => bool) item;
    }
    mapping (address => Stuff) userStuff;

    function register(){
        Stuff s = userStuff[msg.sender];
        s.numItems = 0;
        registrationcomplete(msg.sender);
    }

    function addItem(string name){
        Stuff s = userStuff[msg.sender];
        s.numItems = s.numItems++;
        s.item[name] = true;
        itemadded(name);
    }

    function showItems() internal returns (Stuff){
      return userStuff[msg.sender];
      //s = b;
    }

    function Registrar(){
        owner = msg.sender;
    }

    function kill() onlyowner {
        suicide(owner);
    }

}
