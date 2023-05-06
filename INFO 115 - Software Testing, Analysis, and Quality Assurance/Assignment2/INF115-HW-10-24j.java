//name: Nathan Van
//ID: 44585152

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class TriangleTypeTest {

	@Test 
	public void testTriOutOne() {
		assertEquals(1, TriangleType.triangleType(3, 4, 5));
	}
	@Test
	public void testTriOutTwo() {
		assertEquals(2, TriangleType.triangleType(2, 1, 2));
	}
	@Test
	public void testTriOutThree() {
		assertEquals(3, TriangleType.triangleType(2, 2, 2));
	}
	@Test
	public void testTriOutFour() {
		assertEquals(4, TriangleType.triangleType(0, 1, 1));
	}
	@Test
	public void testTriOutFive() {
		assertEquals(5, TriangleType.triangleType(1001, 1, 1));
	}
}
