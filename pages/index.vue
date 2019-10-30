<template>
  <div>
    <el-form ref="qrcode" :model="form" :rules="rules" label-position="right" label-width="100px">
      <el-container direction="vertical">
        <el-row class="head">
          <el-col :span="21">
            <h1>{{ $t('heading.h1') }}</h1>
            <p>{{ $t('phrase.introduction') }}</p>
          </el-col>
        </el-row>
      </el-container>

      <div class="grid">
        <div class="grid-1">
          <el-container direction="vertical">
            <el-row align="right">
              <el-col><h2>{{ $t('heading.type') }}</h2></el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="Type" prop="type">
                  <el-radio v-model="form.type" label="totp" border>
                    {{ $t('form.type.option.totp.acronym') }}
                  </el-radio>
                  <el-radio v-model="form.type" label="hotp" border>
                    {{ $t('form.type.option.hotp.acronym') }}
                  </el-radio>
                  <el-tooltip class="item" effect="dark" content="." placement="top-end">
                    <div slot="content">
                      {{ $t('form.type.option.totp.acronym') }}: {{ $t('form.type.option.totp.label') }}.
                      <br>
                      {{ $t('form.type.option.hotp.acronym') }}: {{ $t('form.type.option.hotp.label') }}.
                    </div>
                    <span><i class="el-icon-info" /></span>
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>
          </el-container>

          <el-container direction="vertical">
            <el-row align="right">
              <el-col><h2>{{ $t('heading.settings') }}</h2></el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item :label="$t('form.secret.label')" prop="secret">
                  <el-input v-model="form.secret" :placeholder="$t('form.secret.placeholder')" style="width: calc( 100% - 50px )" />
                  <el-tooltip class="item" effect="dark" :content="$t('form.secret.tooltip')" placement="top-end">
                    <span><i class="el-icon-info" /></span>
                  </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('form.label.label')" prop="label">
                  <el-input v-model="form.label" :placeholder="$t('form.label.label')" style="width: calc( 100% - 50px )" />
                  <el-tooltip class="item" effect="dark" :content="$t('form.label.tooltip')" placement="top-end">
                    <span><i class="el-icon-info" /></span>
                  </el-tooltip>
                </el-form-item>
                <el-form-item :label="$t('form.issuer.label')" prop="issuer">
                  <el-input v-model="form.issuer" :placeholder="$t('form.issuer.placeholder')" style="width: calc( 100% - 50px )" />
                  <el-tooltip class="item" effect="dark" :content="$t('form.issuer.tooltip')" placement="top-end">
                    <span><i class="el-icon-info" /></span>
                  </el-tooltip>
                </el-form-item>
                <el-form-item v-if="form.type === 'hotp'" :label="$t('form.counter.label')" prop="counter">
                  <el-input v-model="form.counter" type="number" min="0" :placeholder="$t('form.counter.placeholder')" style="width: calc( 100% - 50px )" />
                  <el-tooltip class="item" effect="dark" content="." placement="top-end">
                    <!-- eslint-disable vue/no-v-html -->
                    <div slot="content" v-html="$t('form.counter.tooltip')" />
                    <!-- eslint-enable vue/no-v-html -->
                    <span><i class="el-icon-info" /></span>
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>
          </el-container>

          <el-container direction="vertical">
            <el-row v-if="!advanced" align="right">
              <el-col>
                <el-checkbox v-model="advanced">
                  {{ $t('heading.advanced_settings') }}
                </el-checkbox>
              </el-col>
            </el-row>
            <div v-if="advanced">
              <el-row align="right">
                <el-col><h2><el-checkbox v-model="advanced" /> {{ $t('heading.advanced_settings') }}</h2></el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item :label="$t('form.algorithm.label')" prop="algorithm">
                    <el-radio v-model="form.algorithm" label="SHA1" border>
                      SHA-1
                    </el-radio>
                    <el-radio v-model="form.algorithm" label="SHA256" border>
                      SHA-256
                    </el-radio>
                    <el-radio v-model="form.algorithm" label="SHA512" border>
                      SHA-512
                    </el-radio>
                    <el-tooltip class="item" effect="dark" placement="top-end">
                      <!-- eslint-disable vue/no-v-html -->
                      <div slot="content" v-html="$t('form.algorithm.tooltip')" />
                      <!-- eslint-enable vue/no-v-html -->
                      <span><i class="el-icon-info" /></span>
                    </el-tooltip>
                  </el-form-item>
                  <el-form-item :label="$t('form.digits.label')" prop="digits">
                    <el-radio v-model="form.digits" :label="6" border>
                      {{ $tc('form.digits.option.label',6, {count:6}) }}
                    </el-radio>
                    <el-radio v-model="form.digits" :label="8" border>
                      {{ $tc('form.digits.option.label',8, {count:8}) }}
                    </el-radio>
                    <el-tooltip class="item" effect="dark" placement="top-end">
                      <!-- eslint-disable vue/no-v-html -->
                      <div slot="content" v-html="$t('form.digits.tooltip')" />
                      <!-- eslint-enable vue/no-v-html -->
                      <span><i class="el-icon-info" /></span>
                    </el-tooltip>
                  </el-form-item>
                  <el-form-item v-if="form.type === 'totp'" :label="$t('form.period.label')" prop="period">
                    <el-input v-model="form.period" type="number" min="20" style="width:170px;">
                      <template slot="append">
                        {{ $t('form.period.unit') }}
                      </template>
                    </el-input>
                    <el-tooltip class="item" effect="dark" placement="top-end">
                      <!-- eslint-disable vue/no-v-html -->
                      <div slot="content" v-html="$t('form.period.tooltip')" />
                      <!-- eslint-enable vue/no-v-html -->
                      <span><i class="el-icon-info" /></span>
                    </el-tooltip>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-container>
        </div>
        <div class="grid-2">
          <el-container direction="vertical">
            <el-row>
              <el-col>
                <div v-show="uri">
                  <div>
                    <canvas ref="canvas" />
                  </div>
                  <div>
                    <el-input
                      v-model="uri"
                      type="textarea"
                      autosize
                      placeholder=""
                      :disabled="true"
                      cols="200"
                    />
                  </div>
                </div>
                <div v-show="!uri" />
              </el-col>
            </el-row>
          </el-container>
        </div>
      </div>
    </el-form>
  </div>
</template>

<i18n>
{
    "fr": {
      "heading": {
        "h1": "Générer un QR code pour du 2FA",
        "type": "Type",
        "settings": "Paramètres",
        "advanced_settings": "Paramètres avancés"
      },
      "phrase": {
        "introduction": "Ce générateur vous aide à sauvegarder ou installer vos configuration OTP plus rapidement"
      },
      "form": {
        "type": {
          "label": "Type",
          "option": {
            "totp": {
              "acronym": "TOTP",
              "label": "Mot de passe unique basé sur du temps"
            },
            "hotp": {
              "acronym": "HOTP",
              "label": "Code d'authentification hashé basé sur du temps"
            }
          },
          "tooltip": "",
          "validation": {
            "required": "Obligatoire"
          }
        },
        "secret": {
          "label": "Secret",
          "placeholder": "Secret",
          "tooltip": "Secret délivré par l'émetteur.",
          "validation": {
            "required": "Obligatoire"
          }
        },
        "label": {
          "label": "Étiquette",
          "placeholder": "Étiquette",
          "tooltip": "Étiquette de la configuration visible dans votre application.",
          "validation": {
            "required": "Required"
          }
        },
        "issuer": {
          "label": "Émetteur",
          "placeholder": "Émetteur",
          "tooltip": "L'émetteur de cette configuration OTP.",
          "validation": {
            "required": "Obligatoire"
          }
        },
        "counter": {
          "label": "Compteur",
          "placeholder": "Compteur initial – Le minimum est 0",
          "tooltip": " Valeur du compteur initial<br />Défaut à 0.",
          "validation": {
            "required": "Obligatoire",
            "integer": "Uniquement les nombres entiers sont authorisés",
            "min": "Nombre entier obligatoirement supérieur à 0"
          }
        },
        "algorithm": {
          "label": "Algorithme",
          "tooltip": "Ignoré par les implémentations Google Authenticator. <br /> Défaut à SHA1.",
          "validation": {
            "validator": "L'algorithme doit être SHA1, SHA256 ou SHA512"
          }
        },
        "digits": {
          "label": "Chiffres",
          "option": {
            "label": "aucun chiffres | 1 chiffre | {count} chiffres"
          },
          "tooltip": "Longueur du code OTP.<br />Défaut à 6 chiffres.<br />Ignoré par l'implémentation Google Authenticator sur Android and Blackberry.",
          "validation": {
            "validator": "Le nombre de chiffres doit êtres {option_1} ou {option_2}"
          }
        },
        "period": {
          "label": "Période",
          "unit": "secondes",
          "tooltip": "La période pendant laquelle un code TOTP sera valide, en secondes.<br /> Défaut à 30.",
          "validation": {
            "integer": "Uniquement un nombre entier",
            "min": "L'utilisateur aura besoin de plus de 10 secondes"
          }
        }
      }
    },
    "en": {
      "heading": {
        "h1": "Generate 2FA QR code",
        "type": "Type",
        "settings": "Settings",
        "advanced_settings": "Advanced settings"
      },
      "phrase": {
        "introduction": "This generator helps you save or install your OTP configuration faster."
      },
      "form": {
        "type": {
          "label": "Type",
          "option": {
            "totp": {
              "acronym": "TOTP",
              "label": "Time-based One-Time Password"
            },
            "hotp": {
              "acronym": "HOTP",
              "label": "HMAC-based One-Time Password"
            }
          },
          "tooltip": "",
          "validation": {
            "required": "Required"
          }
        },
        "secret": {
          "label": "Secret",
          "placeholder": "Secret",
          "tooltip": "Secret provided by the issuer.",
          "validation": {
            "required": "Required"
          }
        },
        "label": {
          "label": "Label",
          "placeholder": "Label",
          "tooltip": "How it will be labeled in your client application.",
          "validation": {
            "required": "Required"
          }
        },
        "issuer": {
          "label": "Issuer",
          "placeholder": "Issuer",
          "tooltip": "The OTP issuer of this configuration.",
          "validation": {
            "required": "Required"
          }
        },
        "counter": {
          "label": "Counter",
          "placeholder": "Initial counter – Minimum is 0",
          "tooltip": " Initial counter value<br />Default to 0.",
          "validation": {
            "required": "Required",
            "integer": "Only integers are allowed",
            "min": "Integer must be 0 or greater"
          }
        },
        "algorithm": {
          "label": "Algorithm",
          "tooltip": "Ignored by the Google Authenticator implementations. <br /> Default to SHA1.",
          "validation": {
            "validator": "Algorithm must be SHA1, SHA256 or SHA512"
          }
        },
        "digits": {
          "label": "Digits",
          "option": {
            "label": "no digit | 1 digit | {count} digits"
          },
          "tooltip": "How long should be the OTP code privided to the user.<br />Default to 6 digits.<br />Ignored by the Google Authenticator implementations on Android and Blackberry.",
          "validation": {
            "validator": "Digits must be {option_1} or {option_2}"
          }
        },
        "period": {
          "label": "Period",
          "unit": "seconds",
          "tooltip": "The period that a TOTP code will be valid for, in seconds.<br /> Default to 30.",
          "validation": {
            "integer": "Must be an interger",
            "min": "The user will need more than 10 seconds"
          }
        }
      }
    }
}
</i18n>

<script>
const QRCode = require('qrcode')

export default {
  name: 'PagePatientProfile',
  components: {

  },
  data () {
    const isCounterRequired = (rule, value, callback) => {
      return this.form.type === 'hotp'
    }
    const counterValidator = (rule, value, callback) => {
      if (this.form.type === 'hotp') {
        if (parseInt(value, 10) === 'NaN') { callback(new Error(this.$t('form.counter.validation.integer'))) } else if (value <= 0) { callback(new Error(this.$t('form.counter.validation.min'))) } else { callback() }
      } else { callback() }
    }

    const algorithmValidator = (rule, value, callback) => {
      if (this.advanced) {
        if (!['SHA1', 'SHA256', 'SHA512'].includes(value)) { callback(new Error(this.$t('form.algorithm.validation.validator'))) } else { callback() }
      } else { callback() }
    }
    const digitsValidator = (rule, value, callback) => {
      if (this.advanced) {
        if (![6, 8].includes(value)) { callback(new Error(this.$t('form.digits.validation.validator', { option_1: 6, option_2: 8 }))) } else { callback() }
      } else { callback() }
    }
    const periodValidator = (rule, value, callback) => {
      if (this.advanced && this.form.type === 'totp') {
        if (parseInt(value, 10) === 'NaN') { callback(new Error(this.$t('form.period.validation.integer'))) } else if (parseInt(value, 10) < 10) { callback(new Error(this.$t('form.period.validation.min'))) } else { callback() }
      } else { callback() }
    }

    return {
      advanced: false,
      form: {
        type: 'totp',
        secret: '',
        label: '',
        issuer: '',
        counter: 0,
        algorithm: 'SHA1',
        digits: 6,
        period: 30
      },
      rules: {
        type: [
          { required: true, message: this.$t('form.type.validation.required'), trigger: 'blur' }
        ],
        secret: [
          { required: true, message: this.$t('form.secret.validation.required'), trigger: 'blur' }
        ],
        label: [
          { required: true, message: this.$t('form.label.validation.required'), trigger: 'blur' }
        ],
        issuer: [
          { required: true, message: this.$t('form.issuer.validation.required'), trigger: 'blur' }
        ],
        counter: [
          { required: isCounterRequired, message: this.$t('form.counter.validation.required'), trigger: 'blur' },
          { validator: counterValidator, message: '', trigger: 'blur' }
        ],
        algorithm: [
          { validator: algorithmValidator, message: '', trigger: 'blur' }
        ],
        digits: [
          { validator: digitsValidator, message: '', trigger: 'blur' }
        ],
        period: [
          { validator: periodValidator, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    uri () {
      // otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example
      let uri = ''
      const scheme = 'otpauth'
      let secret = ''
      let label = ''
      let issuer = ''
      let counter = ''
      let algorithm = ''
      let digits = ''
      let period = ''

      secret = this.form.secret === '' ? '' : `?secret=${this.form.secret}`
      label = this.form.label === '' ? '' : `${encodeURIComponent(this.form.label)}`
      issuer = this.form.issuer === '' ? '' : `&issuer=${encodeURIComponent(this.form.issuer)}`

      if (this.form.type === 'hotp') {
        counter = `&counter=${this.form.counter}`
      }
      if (this.advanced) {
        algorithm = `&algorithm=${this.form.algorithm}`
        digits = `&digits=${this.form.digits}`

        if (this.form.type === 'totp') {
          period = `&period=${this.form.period}`
        }
      }
      uri = `${scheme}://${this.form.type}/${label}${secret}${issuer}${counter}${algorithm}${digits}${period}`
      return this.validateURI(uri) ? uri : ''
    }
  },
  watch: {
    uri (newValue, oldValue) {
      if (newValue) {
        QRCode.toCanvas(this.$refs.canvas, newValue, { errorCorrectionLevel: 'H' }, function (error) {
          this.$notify.error({
            title: 'Error',
            message: error
          })
        })
      } else {
        QRCode.toCanvas(this.$refs.canvas, 'no OTP configuration given.', function (error) {
          this.$notify.error({
            title: 'Error',
            message: error
          })
        })
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.valid = null
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return true
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    validateURI (uri) {
      const regex = /^otpauth:\/\/([th]otp)\/([^?]+)\?secret=([^&]+)(?:&issuer=([^&]+))?(?:&counter=(\d+))?(?:&algorithm=(SHA1|SHA256|SHA512))?(?:&digits=(6|8))?(?:&period=(\d+))?$/
      return regex.test(uri)
    }
  }
}
</script>

<style lang="stylus" scoped>
    .head{
        margin-top: 20px;
        margin-bottom: 1rem;
    }
    .grid{
        display:grid;
        grid-template-columns:minmax(600px, 40%) auto;
        grid-column-gap:2rem;
    }
</style>
