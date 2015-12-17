import 'stuff.sol'

contract Registrar{
    event log(string msg);
    event itemadded(string msg);
    event registrationcomplete(string msg);

    address owner;
    modifier onlyowner { if (msg.sender == owner) _ }

    struct Stuff {
        uint numItems;
        mapping (string => string) item;
    }
    mapping (address => Stuff) userStuff;

    function register(){
        Stuff s = userStuff[msg.sender] = s;
        s.numItems = 0;
        registrationcomplete(msg.sender);
    }

    function addItem(string name){
        Stuff s = userStuff[msg.sender];
        s.numItems = s.numItems++;
        s.item[name] = true;
        itemadded(name);
    }

    function showItems(){
    }

    function Registrar(){
        owner = msg.sender;
    }

    function kill() onlyowner {
        suicide(owner);
    }

}
