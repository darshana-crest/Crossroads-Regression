export class LoginPageFaker {

    constructor(page) {

        this.page = page;

        this.emailTextbox = page.getByRole('textbox', { name: 'Email' });

        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });

        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

   async goto() {

    await this.page.goto(
        'https://stage-crossroads20.hgchristie.net/signin',
        {
            waitUntil: 'networkidle',
            timeout: 60000
        }
    );
}

   async login(email, password) {

    await this.emailTextbox.fill(email);

    await this.passwordTextbox.fill(password);

    await this.loginButton.click();

    await this.page.waitForLoadState('networkidle');
}
}