//FIFA feldatsor - T13 - Sudár Róbert 

//1. feladat

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://t13sudi:*****@cluster0.7hubinu.mongodb.net/";

async function kollekcioLetrehozas() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("T13");
        await db.createCollection("FIFA")
        console.log("1. feldat - A FIFA kollekció létrejött");
        client.close()
    }
    catch (err) {
        console.log("Hiba a létrehozás során", err)

    }
}

kollekcioLetrehozas()

//2. feladat

async function adatokFeltoltese() {
    const client = await MongoClient.connect(url);
    const db = client.db("T13");

    try {
        fifa = [
            "Anglia;4;0;1662",
            "Argentína;10;0;1614",
            "Belgium;1;0;1752",
            "Brazília;3;-1;1719",
            "Chile;17;-3;1576",
            "Dánia;14;-1;1584",
            "Franciaország;2;1;1725",
            "Hollandia;13;3;1586",
            "Horvátország;8;-1;1625",
            "Kolumbia;9;-1;1622",
            "Mexikó;12;0;1603",
            "Németország;16;-1;1580",
            "Olaszország;15;1;1583",
            "Peru;19;0;1551",
            "Portugália;5;1;1643",
            "Spanyolország;7;2;1631",
            "Svájc;11;0;1604",
            "Svédország;18;0;1560",
            "Szenegál;20;0;1546",
            "Uruguay;6;-1;1639",
        ]

        const fifaData = [];
        for (let i = 0; i < fifa.length; i++) {
            const splitData = fifa[i].split(';');
            fifaData.push({
                Csapat: splitData[0],
                Helyezes: Number(splitData[1]),
                Valtozas: Number(splitData[2]),
                Pontszam: Number(splitData[3])
            });
        }

        await db.collection("FIFA").insertMany(fifaData);
        console.log("2. feladat - Adatok sikeresen feltöltve a FIFA kollekcióba");
        client.close();
    } catch (err) {
        console.log("Hiba történt az adatok feltöltése során:", err);
    }
}
adatokFeltoltese();

//3.feladat
async function SorrendbeRendezes() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("T13");
        const collection = db.collection("FIFA");

        const rendezesBeallitasai = { Pontszam: -1 };

        const eredmeny = await collection.find({}, { projection: { _id: 0, Csapat: 1, Pontszam: 1 } }).sort(rendezesBeallitasai).toArray();

        console.log("3. feladat: A pontszám szerint rendezett lista:", eredmeny);
        client.close()
    }

    catch (err) {
        console.error("Hiba a művelet során", err);
    }
}
SorrendbeRendezes()


// 4. feladat
async function top3Lekerdezes() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("T13");
        const collection = db.collection("FIFA");

        const rendezesBeallitasai = { Helyezes: 1 };

        const eredmeny = await collection.find({}, { projection: { _id: 0, Csapat: 1, Pontszam: 1, Helyezes: 1, Valtozas: 1 } }).sort(rendezesBeallitasai).limit(3).toArray();

        console.log("4. feladat - A TOP 3 csapat", eredmeny);
        client.close()
    }

    catch (err) {
        console.error("Hiba a művelet során", err);
    }
}

top3Lekerdezes();

//5. feladat
async function valtozatlanHelyezesuCsapatok() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("T13");
        const collection = db.collection("FIFA");
        const rendezesBeallitasai = { Csapat: 1 };
        const eredmeny = await collection.find({ Valtozas: 0 }, { projection: { _id: 0, Csapat: 1 } }).sort(rendezesBeallitasai).toArray();

        console.log("5. feladat - Azoknak a csapatoknak a neve, amelyeknek helyezése nem változott: ", eredmeny);
        client.close();
    } catch (err) {
        console.error("Hiba a művelet során", err);
    }
}

valtozatlanHelyezesuCsapatok();


// 6. feladat
async function nagyobbMint1600() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("T13");
        const collection = db.collection("FIFA");
        const rendezesBeallitasai = { Pontszam: -1 };
        const eredmeny = await collection.find({ Pontszam: { $gt: 1600 } }, { projection: { _id: 0, Csapat: 1, Pontszam: 1 } }).sort(rendezesBeallitasai).toArray();

        console.log("6. feladat - 1600 pont feletti csapatok:", eredmeny);

        client.close();
    } catch (err) {
        console.error("Hiba a művelet során", err);
    }
}

nagyobbMint1600();

// 7.feladat
async function legrosszabbValtozas() {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db("T13");
        const collection = db.collection("FIFA");

        const eredmeny = await collection.find({}, { projection: { _id: 0, Csapat: 1, Valtozas: 1 } }).sort({ Valtozas: 1 }).limit(1).toArray();

        console.log("7. feladat - Legtöbbet rontott csapat:", eredmeny);
        client.close();
    } catch (err) {
        console.error("Hiba a művelet során", err);
    }
}

legrosszabbValtozas();