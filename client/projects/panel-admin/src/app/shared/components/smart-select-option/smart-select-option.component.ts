import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { SelectModule } from 'ali';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, SelectModule],
  templateUrl: './smart-select-option.component.html',
  styleUrl: './smart-select-option.component.scss',
})
export class SmartSelecOtionComponent{

}
