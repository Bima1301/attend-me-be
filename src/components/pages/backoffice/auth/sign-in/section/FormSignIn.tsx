import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { IconEye, IconEyeClosed, IconFingerprintScan, IconMail } from '@tabler/icons-react'
import type { SignInRequestValue } from '@/api/auth/types'

import { SignInRequestValueSchema } from '@/api/auth/types'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'


export default function FormSignIn() {
  const {
    signIn,
    signInState: { isPending }
  } = useAuth()

  const passwordInputRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState(false)


  const form = useForm<SignInRequestValue>({
    resolver: zodResolver(SignInRequestValueSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  const onSubmit = async (data: SignInRequestValue) => {
    passwordInputRef.current?.blur()
    try {
      await signIn(data)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Username anda"
                  {...field}
                  prefixIcon={<IconMail className="text-primary size-5" />}
                  className="w-full"
                  autoFocus
                  required
                  disabled={form.formState.isSubmitting || isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password anda"
                  prefixIcon={
                    <IconFingerprintScan className="text-primary size-5" />
                  }
                  suffixIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="hover:bg-primary/10 cursor-pointer rounded-full p-1 duration-300 focus:outline-none"
                    >
                      {showPassword ? (
                        <IconEye className="text-primary size-5" />
                      ) : (
                        <IconEyeClosed className="text-primary size-5" />
                      )}
                    </button>
                  }
                  className="w-full"
                  autoComplete="current-password"
                  required
                  disabled={form.formState.isSubmitting || isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={form.formState.isSubmitting || isPending}
                  />
                </FormControl>
                <label
                  htmlFor="remember"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Ingat saya
                </label>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={
            form.formState.isSubmitting || isPending
          }
          className="mt-2 cursor-pointer py-6 disabled:opacity-50"
        >
          {form.formState.isSubmitting || isPending ? '...' : 'Login'}
        </Button>
      </form>

    </Form>
  )
}
