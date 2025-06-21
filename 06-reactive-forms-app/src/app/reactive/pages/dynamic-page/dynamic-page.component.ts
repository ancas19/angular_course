import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtil } from '../../../util/form-util';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent {
  private formBuilder = inject(FormBuilder);
  formUtil=FormUtil;

  newFavoriteGame: FormControl = new FormControl('', Validators.required);


  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ],
      Validators.minLength(3))
  })

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddFavoriteGame(){
    if(this.newFavoriteGame.invalid) return;
    const newGame = this.newFavoriteGame.value;
    this.favoriteGames.push(this.formBuilder.control(newGame,Validators.required));
    this.newFavoriteGame.reset();
  }

 
}
