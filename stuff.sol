contract Thing {
  event Logit(string msg);

  struct Body {
    address owner;
    uint status;
    mapping (string => string) attributes;
  }

  Body body;

  function Thing(string name){
    body.owner = msg.sender;
    body.attributes["name"] = name;

    Logit(" ~ Thing made ~")
  }
}
