contract Thing{
    event Logit(string msg);
    mapping(address => bool) trustMap;
    mapping(address => uint) accounts;

    function isTrusted() returns (bool) {
        Logit(" ~ checking trust ");
        return trustMap[mst.sender];
    }
    function trustMe() returns (bool result) {
        Logit(" ~ asking for trust ")
        trustMap[msg.sender] = true
   }
   function give() returns (uint balance) {
        if isTrusted()
   }
   function () {
     Logit("Unknown Function");
   }
}
