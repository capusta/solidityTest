// import './stuff.sol';

contract Registrar{
    event log(string msg);
    event itemadded(string msg);
    event registrationcomplete(address msg);

    address owner;
    modifier onlyowner { if (msg.sender == owner) _ }

    struct Stuff {
        uint numItems;
        mapping (string => string) item;
    }
    mapping (address => Stuff) userStuff;

    function register(){
        Stuff s = userStuff[msg.sender];
        s.numItems = 0;
        registrationcomplete(msg.sender);
    }

    function isRegistered() returns (bool) {
        return userStuff[msg.sender].numItems == 0;
    }

    function addItem(string name, string _value){
        Stuff s = userStuff[msg.sender];
        s.numItems = s.numItems++;
        s.item[name] = _value;
        itemadded(name);
    }

    function showItems(string somename) returns (string){
      Stuff u = userStuff[msg.sender];
      return u.item[somename];
    }

    function Registrar(){
        owner = msg.sender;
    }

    function kill() onlyowner {
        suicide(owner);
    }

}
