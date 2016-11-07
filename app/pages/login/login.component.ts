import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from '@angular/router';
import {Page} from 'ui/page';
import {Color} from 'color';
import {View} from 'ui/core/view';
import {TextField} from 'ui/text-field';

import {User} from '../../shared/user/user';
import {UserService} from '../../shared/user/user.service';
import {setHintColor} from '../../utils/hint-util';


@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: 'pages/login/login.html',
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginComponent implements OnInit {
    user: User;
    isLoggingIn = true;

    // Interact with the login.html StackLayout
    @ViewChild('container') container: ElementRef;
    @ViewChild('email') email: ElementRef;
    @ViewChild('password') password: ElementRef;

    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User();
        this.user.email = 'nsbob@bob.com';
        this.user.password = 'sopa123';
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = 'res://bg_login';
    }

    submit() {
        if (!this.user.isValidEmail()) {
            alert('Enter a valid email address!');
            return;
        }
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            this.signUp();
        }
    }

    login() {
        this.userService.login(this.user)
            .subscribe(
                () => this.router.navigate(['/list']),
                (err) => alert('Not a valid account')
            )
    }

    signUp() {
        this.userService.register(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                    this.toggleDisplay();
                },
                (err) => {
                    alert("Unfortunately we were unable to create your account." + err);
                }
            );
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
        this.setTextFieldColors();
        let container = <View>this.container.nativeElement;
        container.animate({
            backgroundColor: this.isLoggingIn ? new Color('white') : new Color('#301217'),
            duration: 200
        });
    }

    setTextFieldColors() {
        let emailTextField = <TextField>this.email.nativeElement;
        let passwordTextField = <TextField>this.password.nativeElement;

        let mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
        emailTextField.color = mainTextColor;
        passwordTextField.color = mainTextColor;

        let hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
        setHintColor({view: emailTextField, color: hintColor});
        setHintColor({view: passwordTextField, color: hintColor});
    }
}
