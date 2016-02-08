/*
 * sortable_methods.js
 */
(function($) {

module("sortable: methods");

test("init", function() {
	expect(5);

	$("<div></div>").appendTo("body").vcSortable().remove();
	ok(true, ".sortable() called on element");

	$([]).vcSortable();
	ok(true, ".sortable() called on empty collection");

	$("<div></div>").vcSortable();
	ok(true, ".sortable() called on disconnected DOMElement");

	$("<div></div>").vcSortable().vcSortable("option", "foo");
	ok(true, "arbitrary option getter after init");

	$("<div></div>").vcSortable().vcSortable("option", "foo", "bar");
	ok(true, "arbitrary option setter after init");
});

test("destroy", function() {
	expect(4);
	$("<div></div>").appendTo("body").vcSortable().vcSortable("destroy").remove();
	ok(true, ".sortable('destroy') called on element");

	$([]).vcSortable().vcSortable("destroy");
	ok(true, ".sortable('destroy') called on empty collection");

	$("<div></div>").vcSortable().vcSortable("destroy");
	ok(true, ".sortable('destroy') called on disconnected DOMElement");

	var expected = $("<div></div>").vcSortable(),
		actual = expected.vcSortable("destroy");
	equal(actual, expected, "destroy is chainable");
});

test("enable", function() {
	expect(5);

	var el, actual, expected;

	el = $("#sortable").vcSortable({ disabled: true });

	TestHelpers.vcSortable.sort($("li", el)[0], 0, 44, 0, ".sortable({ disabled: true })");

	el.vcSortable("enable");
	equal(el.vcSortable("option", "disabled"), false, "disabled option getter");

	el.vcSortable("destroy");
	el.vcSortable({ disabled: true });
	el.vcSortable("option", "disabled", false);
	equal(el.vcSortable("option", "disabled"), false, "disabled option setter");

	TestHelpers.vcSortable.sort($("li", el)[0], 0, 44, 2, ".sortable('option', 'disabled', false)");

	expected = $("<div></div>").vcSortable(),
	actual = expected.vcSortable("enable");
	equal(actual, expected, "enable is chainable");
});

test( "disable", function() {
	expect( 9 );

	var chainable,
		element = $( "#sortable" ).vcSortable({ disabled: false });

	TestHelpers.vcSortable.sort( $( "li", element )[ 0 ], 0, 44, 2, ".sortable({ disabled: false })" );

	chainable = element.vcSortable( "disable" );
	TestHelpers.vcSortable.sort( $( "li", element )[ 0 ], 0, 44, 0, "disabled.sortable getter" );

	element.vcSortable( "destroy" );

	element.vcSortable({ disabled: false });
	TestHelpers.vcSortable.sort( $( "li", element )[ 0 ], 0, 44, 2, ".sortable({ disabled: false })" );
	element.vcSortable( "option", "disabled", true);
	equal( element.vcSortable( "option", "disabled" ), true, "disabled option setter" );

	ok( !element.vcSortable( "widget" ).hasClass( "vc-ui-state-disabled" ), "element does not get ui-state-disabled" );
	ok( !element.vcSortable( "widget" ).attr( "vc-ui-aria-disabled" ), "element does not get aria-disabled" );
	ok( element.vcSortable( "widget" ).hasClass( "vc-ui-vcSortable-disabled" ), "element gets ui-sortable-disabled"+ element.vcSortable( "widget" ).attr('class') );

	TestHelpers.vcSortable.sort($( "li", element )[ 0 ], 0, 44, 0, ".sortable('option', 'disabled', true)" );
	equal( chainable, element, "disable is chainable" );
});

test( "refresh() should update the positions of initially empty lists (see #7498)", function() {
	expect( 1 );

	var changeCount = 0,
		element = $( "#qunit-fixture" ).html( "<ul></ul>" ).find( "ul" );

	element
		.css({
			"float": "left",
			width: "100px"
		})
		.vcSortable({
			change: function() {
				changeCount++;
			}
		})
		.append( "<li>a</li><li>a</li>" )
		.find( "li" )
			.css({
				"float": "left",
				width: "50px",
				height: "50px"
			});

	element.vcSortable( "refresh" );

	// Switch the order of the two li elements
	element.find( "li" ).eq( 0 ).simulate( "drag", {
		dx: 55,
		moves: 15
	});

	equal( changeCount, 1 );
});

})(jQuery);
