/*
 * sortable_core.js
 */

(function( $ ) {

module( "vcSortable: core" );

test( "#9314: Sortable: Items cannot be dragged directly into bottom position", function() {
	expect( 1 );

	var el = $( ".connectWith" ).vcSortable({
			connectWith: ".connectWith"
		});

	TestHelpers.vcSortable.sort( $( "li", el[ 1 ] )[ 0 ], 0, -12, 5, "Dragging the sortable into connected sortable" );
});

test( "vc-ui-sortable-handle applied to appropriate element", function() {
	expect( 6 );
	var item = "<li><p></p></li>",
		el = $( "<ul>" + item + item + "</ul>" )
			.vcSortable()
			.appendTo( "#qunit-fixture" );

	ok( el.find( "li:first" ).hasClass( "vc-ui-vcsortable-handle" ), "defaults to item" );
	ok( el.find( "li:last" ).hasClass( "vc-ui-vcsortable-handle" ), "both items received class name" );

	el.vcSortable( "option", "handle", "p" );
	ok( !el.find( "li" ).hasClass( "vc-ui-vcsortable-handle" ), "removed on change" );
	ok( el.find( "p" ).hasClass( "vc-ui-vcsortable-handle" ), "applied to handle" );

	el.append( item ).vcSortable( "refresh" );
	ok( el.find( "p:last" ).hasClass( "vc-ui-vcsortable-handle" ), "class name applied on refresh" );

	el.vcSortable( "destroy" );
	equal( el.find( ".vc-ui-vcsortable-handle" ).length, 0, "class name removed on destroy" );
});

})( jQuery );
