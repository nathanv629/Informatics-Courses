package testing;

public class NathanVan {
	/*variables*/
	private String lastName;
	private String firstName;
	private String netID;
	private int ID;
	
	/*constructor*/
	NathanVan(String firstName, String lastName, String netID, int ID){
		this.firstName = firstName;
		this.lastName = lastName;
		this.netID = netID;
		this.ID = ID;
	}
	
	/*functions*/
	String getFirstName() {return this.firstName;}
	String getLastName() {return this.lastName;}
	String getFullName(){return this.firstName + ' ' + this.lastName;}
	String getUCInetID() {return this.netID;}
	int getStudentNumber() {return this.ID;}
	String getRotatedFullName(int shift) { 
		String rotatedStr = this.getFullName();
		if(shift > 0 ) {
			rotatedStr = rotatedStr.substring(shift, rotatedStr.length()) +
					rotatedStr.substring(0, shift);
		}
		else if (shift < 0) {
			rotatedStr = rotatedStr.substring(rotatedStr.length()-(-shift), rotatedStr.length())+
						rotatedStr.substring(0, -shift);
		}
		return rotatedStr;
	}
}
