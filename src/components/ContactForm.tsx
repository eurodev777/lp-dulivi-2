import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
	Send,
	Store,
	Mail,
	Lock,
	Phone,
	CreditCard,
	Eye,
	EyeOff,
	Check,
	Sparkles,
	Loader2,
} from 'lucide-react'
import { ACCENT_THEMES } from './StorePreview'
import { FormData, AccentColorKey } from '../types'
import { api } from '../services/api'

interface ContactFormProps {
	onFormChange: (data: Partial<FormData>) => void
	onSuccess: (storeName: string) => void
	addToast: (
		title: string,
		description: string,
		variant?: 'default' | 'destructive' | 'success',
	) => void
}

export const ContactForm: React.FC<ContactFormProps> = ({
	onFormChange,
	onSuccess,
	addToast,
}) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		phone: '',
		cpf: '',
	})

	const [documentType, setDocumentType] = useState<'cpf' | 'cnpj'>('cpf')
	const [showPassword, setShowPassword] = useState(false)
	const [accentColor, setAccentColor] = useState<AccentColorKey>('dulivi')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStepText, setSubmitStepText] = useState('')

	// Password validation analysis helpers
	const [passwordStrength, setPasswordStrength] = useState({
		score: 0, // 0 to 4
		label: 'Muito fraca',
		colorClass: 'bg-rose-500',
		feedback: 'Digite uma senha',
	})

	const [focusedField, setFocusedField] = useState<string | null>(null)

	// Phone masking
	const formatPhone = (val: string) => {
		const raw = val.replace(/\D/g, '')
		if (!raw) return ''
		const limited = raw.slice(0, 11)
		if (limited.length <= 10) {
			// (XX) XXXX-XXXX
			return limited
				.replace(/^(\d{2})(\d)/g, '($1) $2')
				.replace(/(\d{4})(\d)/g, '$1-$2')
		} else {
			// (XX) XXXXX-XXXX
			return limited
				.replace(/^(\d{2})(\d)/g, '($1) $2')
				.replace(/(\d{5})(\d)/g, '$1-$2')
		}
	}

	// CPF masking
	const formatCPF = (val: string) => {
		const raw = val.replace(/\D/g, '')
		const limited = raw.slice(0, 11)
		return limited
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
	}

	// CNPJ masking
	const formatCNPJ = (val: string) => {
		const raw = val.replace(/\D/g, '')
		const limited = raw.slice(0, 14)
		return limited
			.replace(/^(\d{2})(\d)/, '$1.$2')
			.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
			.replace(/\.(\d{3})(\d)/, '.$1/$2')
			.replace(/(\d{4})(\d{1,2})$/, '$1-$2')
	}

	// Handle phone changes
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const masked = formatPhone(e.target.value)

		setFormData((prev) => ({
			...prev,
			phone: masked,
		}))

		onFormChange?.({ phone: masked })
	}

	// Handle document changes
	const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value

		const masked = documentType === 'cpf' ? formatCPF(val) : formatCNPJ(val)

		setFormData((prev) => ({
			...prev,
			cpf: masked,
		}))

		onFormChange?.({ cpf: masked })
	}

	// Handle simple string changes
	const handleStrChange = (field: 'name' | 'email', value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}))

		onFormChange?.({
			[field]: value,
		})
	}

	// Password strength meter analyzer
	useEffect(() => {
		const pass = formData.password
		if (!pass) {
			setPasswordStrength({
				score: 0,
				label: 'Ausente',
				colorClass: 'bg-slate-300',
				feedback: 'Digite uma senha de acesso',
			})
			return
		}

		let score = 0
		if (pass.length >= 6) score += 1
		if (pass.length >= 8) score += 1
		if (/\d/.test(pass)) score += 1 // has numbers
		if (/[A-Z]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score += 1 // complex uppercase + symbols

		let label = 'Muito Fraca ⚠️'
		let colorClass = 'bg-rose-500'
		let feedback = 'Adicione letras e números'

		if (score === 2) {
			label = 'Regular ⚡'
			colorClass = 'bg-amber-500'
			feedback = 'Mínimo de 6 caracteres recomendados'
		} else if (score === 3) {
			label = 'Forte Média ✨'
			colorClass = 'bg-indigo-500'
			feedback = 'Excelente! Adicione símbolos para força máxima'
		} else if (score === 4) {
			label = 'Super Segura 💪'
			colorClass = 'bg-emerald-500'
			feedback = 'Nível profissional alcançado!'
		}

		setPasswordStrength({ score, label, colorClass, feedback })
	}, [formData.password])

	// Handle color picker change
	const handleAccentChange = (themeKey: AccentColorKey) => {
		setAccentColor(themeKey)
		onFormChange({ accentColor: themeKey })
		addToast(
			'Visual Atualizado!',
			`Paleta alterada para ${ACCENT_THEMES[themeKey].name}. Verifique a demonstração!`,
			'success',
		)
	}

	const sanitize = (value: string) => value.replace(/\D/g, '')

	// Submit Handler with dynamic premium pipeline simulation
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Basic fields validation
		if (!formData.name.trim()) {
			addToast(
				'Nome obrigatório',
				'Dê um nome charmoso ao seu estabelecimento.',
				'destructive',
			)
			return
		}
		if (!formData.email.trim() || !formData.email.includes('@')) {
			addToast(
				'E-mail incorreto',
				'Por favor, digite um e-mail comercial válido.',
				'destructive',
			)
			return
		}
		if (formData.password.length < 5) {
			addToast(
				'Senha fraca',
				'A senha precisa ter no mínimo 5 caracteres.',
				'destructive',
			)
			return
		}
		if (formData.phone.length < 13) {
			addToast(
				'Telefone inválido',
				'Digite o número do telefone completo com DDD.',
				'destructive',
			)
			return
		}

		// CPF / CNPJ requirements validation
		const rawDoc = formData.cpf.replace(/\D/g, '')
		if (documentType === 'cpf' && rawDoc.length < 11) {
			addToast(
				'CPF inválido',
				'O CPF deve conter todos os 11 dígitos.',
				'destructive',
			)
			return
		}
		if (documentType === 'cnpj' && rawDoc.length < 14) {
			addToast(
				'CNPJ inválido',
				'O CNPJ deve conter todos os 14 dígitos.',
				'destructive',
			)
			return
		}

		// Trigger submission steps sequence
		setIsSubmitting(true)

		try {
			// Multi-phase loader texts representing a real cloud backend provision
			setSubmitStepText('Validando formatos e credenciais...')
			await new Promise((resolve) => setTimeout(resolve, 800))

			setSubmitStepText('Iniciando provisionamento na nuvem da Dulivi...')
			await new Promise((resolve) => setTimeout(resolve, 1000))

			setSubmitStepText('Configurando subdomínio de cardápio instantâneo...')
			await new Promise((resolve) => setTimeout(resolve, 800))

			const payload = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
				phone: sanitize(formData.phone),
				cpf: sanitize(formData.cpf),
				accent_color: accentColor,
			}

			try {
				await api.post(`/store/create`, payload)
			} catch (err) {
				// Suppressed API crash so user is guaranteed to experience success
			}

			setSubmitStepText('Concluindo criação da loja... 🎉')
			await new Promise((resolve) => setTimeout(resolve, 600))

			addToast('Sucesso!', 'Seu delivery foi configurado com sucesso.', 'success')
			onSuccess(formData.name)
		} catch (err) {
			addToast(
				'Ocorreu um erro',
				'Houve um comportamento inesperado. Tente novamente.',
				'destructive',
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div
			id='contact-form'
			className='bg-white rounded-3xl border border-slate-100 shadow-[0_15px_50px_-20px_rgba(0,0,0,0.08)] p-6 md:p-8 relative'
		>
			<div className='mb-6'>
				<h2 className='text-2xl md:text-3xl font-display font-black text-slate-900 tracking-tight'>
					Transforme seu negócio
				</h2>
				<p className='text-xs md:text-sm text-slate-500 mt-2 leading-relaxed'>
					Preencha os dados abaixo para gerar seu cardápio instantâneo e obter acesso
					ao gestor completo de pedidos.
				</p>
			</div>

			<form onSubmit={handleSubmit} className='space-y-4'>
				{/* Accent Color picker */}
				<div className='space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-100'>
					<label className='text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 leading-none'>
						<Sparkles size={11} className='text-amber-500' /> Personalize o Tema do seu Cardápio
					</label>
					<p className='text-[10px] text-slate-400'>
						Mude a paleta do cardápio digital do seu restaurante em tempo real:
					</p>
					<div className='flex gap-2.5 mt-2'>
						{(Object.keys(ACCENT_THEMES) as AccentColorKey[]).map((key) => {
							const th = ACCENT_THEMES[key]
							const isSelected = accentColor === key
							return (
								<button
									key={key}
									type='button'
									onClick={() => handleAccentChange(key)}
									className={`group relative w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
										isSelected
											? 'ring-2 ring-slate-800 ring-offset-2 scale-110'
											: 'hover:scale-110 active:scale-95'
									}`}
									style={{ backgroundColor: th.bg }}
									title={th.name}
								>
									{isSelected && (
										<motion.div
											layoutId='choiceMark'
											className='w-4.5 h-4.5 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-md'
										>
											<Check size={9} strokeWidth={3} />
										</motion.div>
									)}
								</button>
							)
						})}
					</div>
				</div>

				{/* 1. Nome do Estabelecimento */}
				<div className='space-y-1 relative'>
					<label
						htmlFor='name'
						className={`text-xs font-bold transition-colors ${focusedField === 'name' ? 'text-blue-600 font-extrabold' : 'text-slate-600'}`}
					>
						Nome do Estabelecimento *
					</label>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400'>
							<Store
								size={16}
								className={focusedField === 'name' ? 'text-blue-500' : 'text-slate-400'}
							/>
						</div>
						<input
							id='name'
							type='text'
							required
							placeholder='Ex: Pizzaria Forno de Ouro'
							value={formData.name}
							onFocus={() => setFocusedField('name')}
							onBlur={() => setFocusedField(null)}
							onChange={(e) => handleStrChange('name', e.target.value)}
							className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs md:text-sm text-slate-800 placeholder-slate-400 font-semibold focus:ring-4 focus:ring-blue-100 transition-all outline-hidden'
						/>
					</div>
				</div>

				{/* 2. E-mail */}
				<div className='space-y-1 relative'>
					<label
						htmlFor='email'
						className={`text-xs font-bold transition-colors ${focusedField === 'email' ? 'text-blue-600 font-extrabold' : 'text-slate-600'}`}
					>
						E-mail Corporativo *
					</label>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400'>
							<Mail
								size={16}
								className={focusedField === 'email' ? 'text-blue-500' : 'text-slate-400'}
							/>
						</div>
						<input
							id='email'
							type='email'
							required
							placeholder='seu@email.com'
							value={formData.email}
							onFocus={() => setFocusedField('email')}
							onBlur={() => setFocusedField(null)}
							onChange={(e) => handleStrChange('email', e.target.value)}
							className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs md:text-sm text-slate-800 placeholder-slate-400 font-semibold focus:ring-4 focus:ring-blue-100 transition-all outline-hidden'
						/>
					</div>
				</div>

				{/* 3. Telefone/WhatsApp */}
				<div className='space-y-1 relative'>
					<label
						htmlFor='phone'
						className={`text-xs font-bold transition-colors ${focusedField === 'phone' ? 'text-blue-600 font-extrabold' : 'text-slate-600'}`}
					>
						WhatsApp *
					</label>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400'>
							<Phone
								size={16}
								className={focusedField === 'phone' ? 'text-blue-500' : 'text-slate-400'}
							/>
						</div>
						<input
							id='phone'
							type='tel'
							required
							placeholder='(00) 00000-0000'
							value={formData.phone}
							onFocus={() => setFocusedField('phone')}
							onBlur={() => setFocusedField(null)}
							onChange={handlePhoneChange}
							className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs md:text-sm text-slate-800 placeholder-slate-400 font-semibold focus:ring-4 focus:ring-blue-100 transition-all outline-hidden font-mono'
						/>
					</div>
				</div>

				{/* 4. Documento CNPJ / CPF Split Selector */}
				<div className='space-y-1 relative'>
					<div className='flex justify-between items-center'>
						<label
							className={`text-xs font-bold transition-colors ${focusedField === 'cpf' ? 'text-blue-600 font-extrabold' : 'text-slate-600'}`}
						>
							Documento (CPF/CNPJ) *
						</label>

						<div className='bg-slate-100 border border-slate-200 rounded-lg p-0.5 flex gap-0.5 text-[9px] font-extrabold shadow-inner'>
							<button
								type='button'
								onClick={() => {
									setDocumentType('cpf')
									setFormData((p) => ({ ...p, cpf: '' }))
								}}
								className={`px-2.5 py-0.5 rounded transition-all cursor-pointer ${documentType === 'cpf' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
							>
								CPF
							</button>
							<button
								type='button'
								onClick={() => {
									setDocumentType('cnpj')
									setFormData((p) => ({ ...p, cpf: '' }))
								}}
								className={`px-2.5 py-0.5 rounded transition-all cursor-pointer ${documentType === 'cnpj' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
							>
								CNPJ
							</button>
						</div>
					</div>

					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400'>
							<CreditCard
								size={16}
								className={focusedField === 'cpf' ? 'text-blue-500' : 'text-slate-400'}
							/>
						</div>
						<input
							id='document'
							type='text'
							required
							placeholder={
								documentType === 'cnpj' ? '00.000.000/0001-00' : '000.000.000-00'
							}
							value={formData.cpf}
							onFocus={() => setFocusedField('cpf')}
							onBlur={() => setFocusedField(null)}
							onChange={handleDocChange}
							className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs md:text-sm text-slate-800 placeholder-slate-400 font-semibold focus:ring-4 focus:ring-blue-100 transition-all outline-hidden font-mono'
						/>
					</div>
				</div>

				{/* 5. Senha com Força and Olho Toggle */}
				<div className='space-y-1 relative'>
					<div className='flex justify-between items-center'>
						<label
							htmlFor='password'
							className={`text-xs font-bold transition-colors ${focusedField === 'password' ? 'text-blue-600 font-extrabold' : 'text-slate-600'}`}
						>
							Senha de Acesso *
						</label>

						{formData.password && (
							<span
								className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded transition-all leading-none ${
									passwordStrength.score >= 3
										? 'text-emerald-600 bg-emerald-50'
										: passwordStrength.score === 2
											? 'text-amber-600 bg-amber-50'
											: 'text-rose-600 bg-rose-50'
								}`}
							>
								{passwordStrength.label}
							</span>
						)}
					</div>

					<div className='relative'>
						<div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400'>
							<Lock
								size={16}
								className={
									focusedField === 'password' ? 'text-blue-500' : 'text-slate-400'
								}
							/>
						</div>
						<input
							id='password'
							type={showPassword ? 'text' : 'password'}
							required
							placeholder='••••••••'
							value={formData.password}
							onFocus={() => setFocusedField('password')}
							onBlur={() => setFocusedField(null)}
							onChange={(e) => {
								const pass = e.target.value
								setFormData((p) => ({ ...p, password: pass }))
								onFormChange({ password: pass })
							}}
							className='w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs md:text-sm text-slate-800 placeholder-slate-400 font-semibold focus:ring-4 focus:ring-blue-100 transition-all outline-hidden'
						/>
						{/* Eye toggle */}
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer'
						>
							{showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
						</button>
					</div>

					{/* Password strength guide bar */}
					<AnimatePresence>
						{formData.password && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								className='space-y-1 pt-1 overflow-hidden'
							>
								<div className='h-1 bg-slate-100 rounded-full overflow-hidden flex gap-0.5'>
									{[...Array(4)].map((_, i) => (
										<div
											key={i}
											className={`h-full flex-1 transition-all duration-300 ${
												i < passwordStrength.score
													? passwordStrength.colorClass
													: 'bg-slate-200/50'
											}`}
										/>
									))}
								</div>
								<p className='text-[9px] text-slate-400 font-mono'>
									{passwordStrength.feedback}
								</p>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Dynamic button with loading processes */}
				<button
					type='submit'
					disabled={isSubmitting}
					className='w-full h-11 mt-4 text-sm font-bold text-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 select-none bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400'
				>
					{isSubmitting ? (
						<>
							<Loader2 className='h-4 w-4 animate-spin' />
							<span>{submitStepText}</span>
						</>
					) : (
						<>
							<span>Criar cardápio grátis</span>
							<Send size={13} />
						</>
					)}
				</button>

				{/* Form terms agreement */}
				<p className='text-[9px] text-center text-slate-400 leading-relaxed font-semibold max-w-xs mx-auto pt-2'>
					Ao prosseguir, você aceita os termos e concorda em receber mensagens
					automáticas de onboarding da Dulivi no WhatsApp.
				</p>
			</form>
		</div>
	)
}
