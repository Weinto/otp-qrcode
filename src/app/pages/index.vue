<template>
  <UContainer class="py-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left Column: Form -->
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold">{{ $t('heading.h1') }}</h1>
          <p class="text-gray-500 mt-2">{{ $t('phrase.introduction') }}</p>
        </div>

        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          
          <!-- Type Section -->
          <USeparator :label="$t('heading.type')" />
          
          <UFormField name="type">
            <template #label>
              <div class="flex items-center gap-1">
                 {{ $t('form.type.label') }}
                 <UPopover mode="hover">
                    <UIcon name="i-heroicons-information-circle" class="text-gray-400 hover:text-gray-600 w-4 h-4" />
                    <template #panel>
                       <div class="p-2 text-sm max-w-xs">
                          <p><strong>{{ $t('form.type.option.totp.acronym') }}:</strong> {{ $t('form.type.option.totp.label') }}</p>
                          <hr class="my-1" />
                          <p><strong>{{ $t('form.type.option.hotp.acronym') }}:</strong> {{ $t('form.type.option.hotp.label') }}</p>
                       </div>
                    </template>
                 </UPopover>
              </div>
            </template>
            <URadioGroup v-model="state.type" :items="typeOptions" :ui="{ fieldset: 'flex gap-4' }" />
          </UFormField>

          <!-- Settings Section -->
          <USeparator :label="$t('heading.settings')" />

          <UFormField name="secret">
            <template #label>
              <div class="flex items-center gap-1">
                 {{ $t('form.secret.label') }}
                 <UTooltip :text="$t('form.secret.tooltip')" :popper="{ placement: 'top' }">
                    <UIcon name="i-heroicons-information-circle" class="text-gray-400 hover:text-gray-600 w-4 h-4" />
                 </UTooltip>
              </div>
            </template>
            <UInput v-model="state.secret" :placeholder="$t('form.secret.placeholder')" class="w-full" />
          </UFormField>

          <UFormField name="label">
            <template #label>
              <div class="flex items-center gap-1">
                 {{ $t('form.label.label') }}
                 <UTooltip :text="$t('form.label.tooltip')" :popper="{ placement: 'top' }">
                    <UIcon name="i-heroicons-information-circle" class="text-gray-400 hover:text-gray-600 w-4 h-4" />
                 </UTooltip>
              </div>
            </template>
            <UInput v-model="state.label" :placeholder="$t('form.label.placeholder')" class="w-full" />
          </UFormField>

          <UFormField name="issuer">
            <template #label>
              <div class="flex items-center gap-1">
                 {{ $t('form.issuer.label') }}
                 <UTooltip :text="$t('form.issuer.tooltip')" :popper="{ placement: 'top' }">
                    <UIcon name="i-heroicons-information-circle" class="text-gray-400 hover:text-gray-600 w-4 h-4" />
                 </UTooltip>
              </div>
            </template>
            <UInput v-model="state.issuer" :placeholder="$t('form.issuer.placeholder')" class="w-full" />
          </UFormField>

          <UFormField v-if="state.type === 'hotp'" name="counter">
             <template #label>
              <div class="flex items-center gap-1">
                 {{ $t('form.counter.label') }}
                 <UTooltip :text="$t('form.counter.tooltip')" :popper="{ placement: 'top' }">
                    <UIcon name="i-heroicons-information-circle" class="text-gray-400 hover:text-gray-600 w-4 h-4" />
                 </UTooltip>
              </div>
            </template>
             <UInput v-model.number="state.counter" type="number" :placeholder="$t('form.counter.placeholder')" class="w-full" />
          </UFormField>

          <!-- Advanced Settings -->
          <div class="pt-4">
             <UCheckbox v-model="advanced" :label="$t('heading.advanced_settings')" />
          </div>

          <div v-if="advanced" class="space-y-4 border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
             <UFormField name="algorithm">
                <template #label>
                  <div class="flex items-center gap-1">
                     {{ $t('form.algorithm.label') }}
                     <UTooltip :text="$t('form.algorithm.tooltip')" :popper="{ placement: 'top' }">
                        <UIcon name="i-heroicons-information-circle" class="text-gray-400 hover:text-gray-600 w-4 h-4" />
                     </UTooltip>
                  </div>
                </template>
                <URadioGroup v-model="state.algorithm" :items="algorithmOptions" :ui="{ fieldset: 'flex gap-4' }" />
             </UFormField>

             <UFormField name="digits">
                <template #label>
                  <div class="flex items-center gap-1">
                     {{ $t('form.digits.label') }}
                     <UTooltip :text="$t('form.digits.tooltip')" :popper="{ placement: 'top' }">
                        <UIcon name="i-heroicons-information-circle" class="text-gray-400 hover:text-gray-600 w-4 h-4" />
                     </UTooltip>
                  </div>
                </template>
                <URadioGroup v-model="state.digits" :items="digitsOptions" :ui="{ fieldset: 'flex gap-4' }" />
             </UFormField>

             <UFormField v-if="state.type === 'totp'" name="period">
                <template #label>
                  <div class="flex items-center gap-1">
                     {{ $t('form.period.label') }}
                     <UTooltip :text="$t('form.period.tooltip')" :popper="{ placement: 'top' }">
                        <UIcon name="i-heroicons-information-circle" class="text-gray-400 hover:text-gray-600 w-4 h-4" />
                     </UTooltip>
                  </div>
                </template>
                <UInput v-model.number="state.period" type="number">
                  <template #trailing>
                    <span class="text-gray-500 text-xs">{{ $t('form.period.unit') }}</span>
                  </template>
                </UInput>
             </UFormField>
          </div>

        </UForm>
      </div>

      <!-- Right Column: Preview -->
      <div class="flex flex-col items-center justify-start pt-10">
        <div v-if="qrCodeDataUrl" class="text-center space-y-4">
           <img :src="qrCodeDataUrl" alt="QR Code" class="mx-auto border-4 border-white shadow-lg rounded-lg" />
           <UTextarea :model-value="uri" readonly autosize class="font-mono text-xs w-full max-w-sm" />
           <UButton
              icon="i-heroicons-clipboard"
              size="xs"
              color="gray"
              variant="soft"
              label="Copy URI"
              @click="copyToClipboard(uri)"
           />
        </div>
        <div v-else class="text-gray-400 text-center border-2 border-dashed border-gray-200 rounded-lg p-10 w-full">
           Fill out the form to generate QR Code
        </div>
        
        <div class="mt-8">
            <UButton :to="localePath('about')" variant="link" color="gray">
              About this tool
            </UButton>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from 'zod'
import QRCode from 'qrcode'
import { watchDebounced } from '@vueuse/core'

const { t } = useI18n()
const localePath = useLocalePath()

// --- Options for Selects/Radios ---
const typeOptions = computed(() => [
  { value: 'totp', label: t('form.type.option.totp.acronym') },
  { value: 'hotp', label: t('form.type.option.hotp.acronym') }
])

const algorithmOptions = computed(() => [
  { value: 'SHA1', label: 'SHA-1' },
  { value: 'SHA256', label: 'SHA-256' },
  { value: 'SHA512', label: 'SHA-512' }
])

const digitsOptions = computed(() => [
  { value: 6, label: t('form.digits.option.label', { count: 6 }, 6) },
  { value: 8, label: t('form.digits.option.label', { count: 8 }, 8) }
])

// --- State ---
const advanced = ref(false)

const state = reactive({
  type: 'totp',
  secret: '',
  label: '',
  issuer: '',
  counter: 0,
  algorithm: 'SHA1',
  digits: 6,
  period: 30
})

// --- Schema Validation ---
const schema = z.object({
  type: z.enum(['totp', 'hotp']),
  secret: z.string().min(1, t('form.secret.validation.required')),
  label: z.string().min(1, t('form.label.validation.required')),
  issuer: z.string().min(1, t('form.issuer.validation.required')),
  counter: z.number().int().min(0, t('form.counter.validation.min')),
  algorithm: z.enum(['SHA1', 'SHA256', 'SHA512']),
  digits: z.union([z.literal(6), z.literal(8)]),
  period: z.number().int().min(10, t('form.period.validation.min'))
})

// --- Logic ---
const uri = ref('')
const qrCodeDataUrl = ref('')

// Compute URI
watch(() => state, () => {
    // Implement standard otpauth format
    // otpauth://totp/Label?secret=SECRET&issuer=Issuer&algorithm=SHA1&digits=6&period=30
    
    // Clean label for path
    const safeLabel = state.issuer && state.label ? `${encodeURIComponent(state.issuer)}:${encodeURIComponent(state.label)}` : encodeURIComponent(state.label)
    
    // Start constructing query
    const params = new URLSearchParams()
    if (state.secret) params.append('secret', state.secret)
    if (state.issuer) params.append('issuer', state.issuer)
    if (state.algorithm !== 'SHA1') params.append('algorithm', state.algorithm) // Standard often omits default
    if (state.digits !== 6) params.append('digits', state.digits.toString())
    
    if (state.type === 'totp') {
       if (state.period !== 30) params.append('period', state.period.toString())
    } else {
       params.append('counter', state.counter.toString())
    }

    if(state.secret && state.label) {
        uri.value = `otpauth://${state.type}/${safeLabel}?${params.toString()}`
    } else {
        uri.value = ''
    }
}, { deep: true, immediate: true })

// Generate QR (debounced)
watchDebounced(uri, async (newUri) => {
    if (!newUri) {
        qrCodeDataUrl.value = ''
        return
    }
    try {
        qrCodeDataUrl.value = await QRCode.toDataURL(newUri, { errorCorrectionLevel: 'H' })
    } catch (e) {
        console.error(e)
    }
}, { debounce: 300, immediate: true })

const onSubmit = () => {
  // handled by watch
}

const toast = useToast()

const copyToClipboard = async (text: string) => {
    if (!text) return

    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text)
        } else {
            // Fallback for non-secure contexts (http)
            const textArea = document.createElement("textarea")
            textArea.value = text
            textArea.style.position = "fixed"
            textArea.style.left = "-9999px"
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()
            
            try {
                const successful = document.execCommand('copy')
                if (!successful) throw new Error('Copy command failed')
            } finally {
                document.body.removeChild(textArea)
            }
        }
        
        toast.add({
            title: t('clipboard.success'),
            icon: 'i-heroicons-check-circle',
            color: 'green'
        })
    } catch (err) {
        console.error('Failed to copy: ', err)
        toast.add({
            title: t('clipboard.error'),
            icon: 'i-heroicons-x-circle',
            color: 'red'
        })
    }
}
</script>
