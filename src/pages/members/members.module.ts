import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembersPage } from './members';

@NgModule({
  declarations: [
    MembersPage,
  ],
  imports: [
    IonicPageModule.forChild(MembersPage),
  ],
  exports: [
    MembersPage
  ]
})
export class MembersPageModule {}
