# Feature: Auth

Login and registration forms. Currently fully stubbed — no backend auth.

## Files

```
src/modules/auth/
  domain/
    types.ts          AuthFormData, AuthMode ('login' | 'register')
    auth.service.ts   validateEmail(), validatePassword() — pure fns
  components/
    login-form.tsx    Client — uses <FormField theme="dark"> + <Button variant="cta">
    register-form.tsx Client — same pattern, minLength={8} on password
    auth-toggle.tsx   Client — switches between login/register modes
  hooks/
    use-auth-form.ts  Form state + no-op submit handler
  views/
    auth.view.tsx     Client — composes toggle + active form
```

## Stub Status

`handleSubmit` in `use-auth-form.ts` calls `e.preventDefault()` and does nothing else. No API call, no session, no token. Replace the handler body when Firebase/NextAuth is integrated.

## Integration Plan (when ready)

- Firebase Auth: wrap with `FirebaseAuthProvider` in root layout, replace `handleSubmit` with `signInWithEmailAndPassword` / `createUserWithEmailAndPassword`
- NextAuth: add `app/api/auth/[...nextauth]/route.ts`, wrap with `SessionProvider`, use `signIn()` from `next-auth/react`

## UI Notes

- Auth view has a dark background (`#111`) — that's why `<FormField theme="dark">` and the `cta` button variant are used (red on dark)
- `<AuthToggle>` switches `mode` between `'login'` and `'register'` to conditionally render `<LoginForm>` or `<RegisterForm>`
