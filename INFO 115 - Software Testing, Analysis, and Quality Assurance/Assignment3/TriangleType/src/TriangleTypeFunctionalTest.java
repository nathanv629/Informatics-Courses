//import static org.junit.Assert.*;
//
//import org.junit.Before;
//import org.junit.Test;
//
//
//public class TriangleTypeFunctionalTest {
//
//	@Before
//	public void setUp() throws Exception {
//	}
//
//	// Iftekhar: This is a dummy test case, which you can replace.
//	@Test
//	//scalene
//	//sum of any two sides is greater than the other side
//	public void testTriangleTypeOne() {
//		assertEquals(1, TriangleType.triangleType(3, 4, 5));
//	}
//	@Test
//	//isosceles
//	//there must be two equal sides
//	public void testTriangleTypeTwo() {
//		assertEquals(2, TriangleType.triangleType(2, 1, 2));
//	}
//	@Test
//	//equilateral
//	//all sides are equal
//	public void testTriangleTypeThree() {
//		assertEquals(3, TriangleType.triangleType(2, 2, 2)); //all sides are equal to 2 
//	}
//	@Test
//	//not a triangle
//	//a side is longer than the sum of other two OR a side is less than 1 (0)
//	public void testTriangleTypeFour() {
//		assertEquals(4, TriangleType.triangleType(4, 4, 9)); // 3 + 4 = 7 < 8
//		assertEquals(4, TriangleType.triangleType(0, 11, 11)); //a side is 0 
//	}
//	@Test
//	//out of bound
//	public void testTriangleTypeFive() {
//		assertEquals(5, TriangleType.triangleType(1001, 900, 900));
//	}
//}
