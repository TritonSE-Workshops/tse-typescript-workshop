interface BandAid {
    int price();
    String peel();
}

class SmallBandAid implements BandAid {
    public int price() {
        return 10;
    }

    public String peel() {
        return "ouch!";
    }
}

class SmallAdhesiveBandage {
    public int price() {
        return 5;
    }

    public String peel() {
        return "arrrgh!";
    }
}


public class _04_nominal_typing {
    public static void main() {
        BandAid b = new SmallBandAid();

        // b = new SmallAdhesiveBandage();
    }
}
