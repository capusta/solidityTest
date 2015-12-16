contract Test{
   event Logit(string msg);
   mapping(uint => string) someIndex;

   function greet(string _greeting) returns(string answer) {
      // newgreeting = _greeting + " buddy";
      answer =  _greeting;
   }
   function () {
     Logit("Unknown Function");
   }
}
