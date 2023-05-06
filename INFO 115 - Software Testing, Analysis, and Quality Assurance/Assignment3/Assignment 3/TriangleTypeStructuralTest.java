import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;


public class TriangleTypeStructuralTest {

	@Before
	public void setUp() throws Exception {
	}

	// Iftekhar: This is a dummy test case, which you can replace.
	@Test
	//scalene
	//sum of any two sides is greater than the other side
	public void testTriangleTypeOne() {
		assertEquals(1, TriangleType.triangleType(3, 4, 5));
	}
	@Test
	//isosceles
	//there must be two equal sides
	public void testTriangleTypeTwo() {
		assertEquals(2, TriangleType.triangleType(2, 1, 2));
		assertEquals(2, TriangleType.triangleType(3, 3, 1));
		assertEquals(2, TriangleType.triangleType(2, 4, 4));
	}
	@Test
	//equilateral
	//all sides are equal
	public void testTriangleTypeThree() {
		assertEquals(3, TriangleType.triangleType(5, 5, 5));
	}
	@Test
	//not a triangle
	//a side is longer than the sum of other two
	public void testTriangleTypeFour() {
		assertEquals(4, TriangleType.triangleType(4, 4, 9));
		assertEquals(4, TriangleType.triangleType(5, 11, 5));
		assertEquals(4, TriangleType.triangleType(23, 11, 11));
		assertEquals(4, TriangleType.triangleType(3, 4, 8));
		assertEquals(4, TriangleType.triangleType(4, 11, 5));
		assertEquals(4, TriangleType.triangleType(0, 11, 11));
		assertEquals(4, TriangleType.triangleType(23, 10, 11));
		assertEquals(4, TriangleType.triangleType(11, 0, 11));
		assertEquals(4, TriangleType.triangleType(11, 11, 0));
	}
	@Test
	//out of bound
	public void testTriangleTypeFive() {
		assertEquals(5, TriangleType.triangleType(1001, 900, 900));
		assertEquals(5, TriangleType.triangleType(900, 1001, 900));
		assertEquals(5, TriangleType.triangleType(900, 900, 1001));
	}
}
