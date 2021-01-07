<template>
  <div class="">
    <nav class="navbar navbar-dark bg-success">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/logo2.png"
          width="60"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        VignAff Crypto
      </a>
    </nav>
    <div class="container">
      <div class="card">
        <div class="card-header">Traditional Cipher</div>
        <div class="card-body">
          <div class="form-group">
            <label for="algoritme">Pilih Jenis Cipher</label>
            <select
              name="algoritme"
              id="algoritme"
              class="form-control"
              v-model="selectedAlgoritme"
              @change="changeAlgoritme($event.target.value)"
            >
              <option v-for="(v, i) in algoritme" :key="i" :value="v.code">
                {{ v.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="radio"
                id="encrypt-radio"
                value="encrypt"
                :checked="isEncrypt"
                @change="isEncrypt = true"
              />
              <label class="form-check-label" for="encrypt-radio"
                >Encrypt</label
              >
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="radio"
                id="decrypt-radio"
                value="decrypt"
                :checked="!isEncrypt"
                @change="isEncrypt = false"
              />
              <label class="form-check-label" for="decrypt-radio"
                >Decrypt</label
              >
            </div>
          </div>

          <div v-if="isEncrypt" class="form-group">
            <label for="plaintext">Plaintext</label>
            <textarea
              id="plaintext"
              class="form-control"
              rows="2"
              v-model="plaintext"
              @input="plaintext = alphabetOnly(plaintext.toLowerCase())"
            ></textarea>
          </div>

          <div v-if="!isEncrypt" class="form-group">
            <label for="ciphertext">Ciphertext</label>
            <textarea
              id="ciphertext"
              class="form-control"
              rows="2"
              v-model="ciphertext"
              @input="ciphertext = alphabetOnly(ciphertext.toLowerCase())"
            ></textarea>
          </div>

          <div v-show="!isValid" class="alert alert-danger" role="alert">
            Invalid Key
          </div>

          <div v-if="!isAffine" class="form-group">
            <label for="key">Key</label>
            <textarea
              id="key"
              class="form-control"
              rows="1"
              v-model="key"
            ></textarea>
          </div>

          <div v-if="isAffine" class="form-group">
            <label for="key-affine-1">Key 1</label>
            <textarea
              id="key-affine-1"
              class="form-control"
              rows="1"
              v-model="keyAffine.key1"
              @input="keyAffine.key1 = numberOnly(keyAffine.key1)"
            ></textarea>
          </div>

          <div v-if="isAffine" class="form-group">
            <label for="key-affine-2">Key 2</label>
            <textarea
              id="key-affine-2"
              class="form-control"
              rows="1"
              v-model="keyAffine.key2"
              @input="keyAffine.key2 = numberOnly(keyAffine.key2)"
            ></textarea>
          </div>

          <div class="form-group">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="radio-cipher"
                id="no-spasi-radio"
                value="no-spasi"
                :checked="!withSpasi"
                @change="withSpasi = false"
              />
              <label class="form-check-label" for="no-spasi-radio"
                >Tanpa Spasi</label
              >
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="radio-cipher"
                id="with-spasi-radio"
                value="with-spasi"
                :checked="withSpasi"
                @change="withSpasi = true"
              />
              <label class="form-check-label" for="with-spasi-radio"
                >Kelompok 5 Huruf</label
              >
            </div>
          </div>

          <div class="form-group">
            <button
              class="btn btn-success"
              :disabled="!selectedAlgoritme"
              @click="process()"
            >
              Process
            </button>
          </div>

          <div v-if="resultText">
            <div class="form-group">
              <label for="result-text">Hasil Enkripsi</label>
              <textarea
                id="result-text"
                rows="3"
                class="form-control"
                v-model="resultText"
              ></textarea>
            </div>
            <div class="form-group">
              <button @click="download()" class="btn btn-success">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="footer" class="bg-success">
      <center>Copyright &copy; 2021</center>
    </div>
  </div>
</template>

<script>
import affineHelper from "../cipher/affine/helper";
import affine from "../cipher/affine";
import vigenere from "../cipher/vigenere";
import { textToIntList, intListToText } from "../cipher/helper";

export default {
  data() {
    return {
      resultText: "",
      isEncrypt: true,
      withSpasi: false,
      ciphertext: "",
      plaintext: "",
      selectedAlgoritme: "",
      isValid: true,
      encryptResult: "",
      key: "",
      isAffine: false,
      keyAffine: {
        key1: "",
        key2: "",
      },
      algoritme: [
        { code: "vigenere", name: "Simple Vigenere Cipher" },
        { code: "affine", name: "Affine Cipher" },
      ],
    };
  },

  methods: {
    changeAlgoritme(algoritme) {
      this.reset();
      if (algoritme === "affine") {
        this.isAffine = true;
      } else {
        this.isAffine = false;
      }
    },
    process() {
      this.isValid = true;

      if (this.selectedAlgoritme === "affine") {
        this.isValid =
          affineHelper.gcd(parseInt(this.keyAffine.key1), 26) === 1;
      }

      if (this.isValid && this.isEncrypt) {
        if (this.selectedAlgoritme === "affine") {
          const encryptedText = affine.encrypt(
            this.plaintext,
            this.keyAffine.key1,
            this.keyAffine.key2
          );

          this.resultText = !this.withSpasi
            ? encryptedText
            : this.groupingText(encryptedText);
        } else if (this.selectedAlgoritme === "vigenere") {
          const encryptedText = intListToText(
            vigenere.encrypt(
              textToIntList(this.plaintext),
              textToIntList(this.key)
            )
          );
          this.resultText = !this.withSpasi
            ? encryptedText
            : this.groupingText(encryptedText);
        }
      } else if (this.isValid && !this.isEncrypt) {
        if (this.selectedAlgoritme === "affine") {
          const decryptedText = affine.decrypt(
            this.ciphertext,
            this.keyAffine.key1,
            this.keyAffine.key2
          );

          this.resultText = !this.withSpasi
            ? decryptedText
            : this.groupingText(decryptedText);
        } else if (this.selectedAlgoritme === "vigenere") {
          const encryptedText = intListToText(
            vigenere.decrypt(
              textToIntList(this.plaintext),
              textToIntList(this.key)
            )
          );
          this.resultText = !this.withSpasi
            ? encryptedText
            : this.groupingText(encryptedText);
        }
      }
    },
    download() {
      const filename = Date.now() + ".txt";
      this.downloadFile(filename, [this.resultText], "text/plain");
    },
    downloadFile(filename, data, type) {
      const file = new Blob(data, { type });

      if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
      else {
        // Others
        const a = document.createElement("a");
        const url = URL.createObjectURL(file);

        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
    groupingText(text) {
      var output = "";
      for (let i = 0; i < text.length; i++) {
        output += text[i];
        if (i % 5 == 4) output += " ";
      }

      return output;
    },
    reset() {
      this.resultText = "";
      (this.isValid = true),
        (this.plaintext = ""),
        (this.ciphertext = ""),
        (this.isEncrypt = true),
        (this.key = ""),
        (this.keyAffine.key1 = ""),
        (this.keyAffine.key2 = "");
    },
    alphabetOnly(text) {
      return text.replace(/[^a-zA-Z]+/g, "");
    },
    numberOnly(text) {
      return text.replace(/[^0-9]+/g, "");
    },
  },
};
</script>

<style scoped>
.card {
  margin-top: 50px;
}
#footer {
  margin-top: 50px;
  height: 50px;
  line-height: 50px;

  color: #fff;
}
</style>

