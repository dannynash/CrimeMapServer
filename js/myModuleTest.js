describe("test danny js", function() {

    beforeEach(module('dannyApp'));

    var obj;
    
    beforeEach(inject(function(danny){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        obj = danny;
    }));

    
    
    it("contains spec with an expectation", function() {
        alert(obj.echo('ggyy'));
    });
    
    it("test set/get cookie", function() {
        var text = 'ggggg';
        obj.setCookie(text);
        alert(obj.getCookie());
        expect(obj.getCookie()).toEqual(text);

    });
});