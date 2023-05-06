package testing;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class TestNathanVan {

	NathanVan jUnitTest = new NathanVan("Nathan", "Van", "nathantv", 44585152);

	@Test
	public void testGetFirstName() {
		//Test getFirstName() function
		String firstName = jUnitTest.getFirstName();
		assertEquals("Nathan", firstName);
		
		//Test getRotatedFullName(int shift) function
	}
	@Test
	public void testGetLastName() {
		//Test getLastName() function
		String lastName = jUnitTest.getLastName();
		assertEquals("Van", lastName);
	}
	@Test
	public void testGetFullName() {
		//Test getFullName() function
		String fullName = jUnitTest.getFullName();
		assertEquals("Nathan Van", fullName);
	}
	@Test
	public void testGetUCInetID() {
		//Test getUCInetID() function
		String netID = jUnitTest.getUCInetID();
		assertEquals("nathantv", netID);
	}
	@Test
	public void testGetStudentNumber() {
		//Test getStudentNumber() function
		int ID = jUnitTest.getStudentNumber();
		assertEquals(44585152, ID);
	}
	@Test
	public void testGetRotatedFullNamePositive() {
		//Test getRotatedFullName with a positive shift
		String rotatedStr = jUnitTest.getRotatedFullName(2);
		assertEquals("than VanNa", rotatedStr);
	}
	@Test
	public void testGetRotatedFullNameNegative() {
		//Test getRotatedFullName with a negative shift
		String rotatedStr = jUnitTest.getRotatedFullName(-5);
		assertEquals("n VanNatha", rotatedStr);
	}
}
