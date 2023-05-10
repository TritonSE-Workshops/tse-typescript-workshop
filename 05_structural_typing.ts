interface BandAid {
  price(): number;
  peel(): string;
}

class SmallBandAid implements BandAid {
  price(): number {
    return 10;
  }

  peel(): string {
    return "ouch!";
  }
}

class SmallAdhesiveBandage {
  price(): number {
    return 5;
  }

  peel(): string {
    return "arrrgh!";
  }
}

let b: BandAid = new SmallBandAid();

// b = new SmallAdhesiveBandage();

// b = { price: () => 100, peel: () => "ow ow ow ow ow ow ow" };
