import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}
}
