import { BookMarked, BookText, LayoutDashboard, UserPen, Users } from 'lucide-angular';

import { AddMemberModalComponent } from "../../../shared/components/modal/add-member-modal/add-member-modal.component";
import { ApiService } from '../../../core/services/api.service';
import { BookListViewComponent } from "../../../shared/components/book-list-view/book-list-view.component";
import { Component } from '@angular/core';
import { MemberListViewComponent } from "../../../shared/components/member-list-view/member-list-view.component";
import { StaffListViewComponent } from "../../../shared/components/staff-list-view/staff-list-view.component";
import { TopChoiceListViewComponent } from "../../../shared/components/top-choice-list-view/top-choice-list-view.component";
import { UserCount } from '../../../interfaces/user';
import { UserListViewComponent } from "../../../shared/components/user-list-view/user-list-view.component";
import { ViewBoxComponent } from "../../../shared/components/view-box/view-box.component";
import { WelcomeDateTimeComponentComponent } from "../../../shared/components/welcome-date-time-component/welcome-date-time-component.component";

@Component({
  selector: 'app-librarian-overview',
  standalone: true,
  imports: [WelcomeDateTimeComponentComponent, ViewBoxComponent, UserListViewComponent, TopChoiceListViewComponent, MemberListViewComponent],
  templateUrl: './librarian-overview.component.html',
  styleUrl: './librarian-overview.component.scss'
})
export class LibrarianOverviewComponent {
  isAddModalOpen: boolean = true;
  readonly LayoutDashboard = LayoutDashboard;
  readonly Users = Users;
  readonly UserPen = UserPen;
  readonly BookText = BookText;
  readonly BookMarked = BookMarked;

  adminCount: UserCount = {} as UserCount;
  librarianCount: UserCount = {} as UserCount;
  assistantCount: UserCount = {} as UserCount;
  staffCount: UserCount = {} as UserCount;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadAdminCount();
    this.loadLibrarianCount();
    this.loadStaffCount();
    this.loadUAssistantCount();
    this.loadBooks();
    this.loadStaff();
  }

  loadAdminCount(): void {
    this.apiService.getUsersCount('Admin').subscribe({
      next: (data) => {
        if (data.success) {
          console.log('Users:', data.data);
          this.adminCount = data.data;
        } else {
          console.error('Error fetching users:', data);
        }
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  loadLibrarianCount(): void {
    this.apiService.getUsersCount('Librarian').subscribe({
      next: (data) => {
        if (data.success) {
          console.log('Users:', data.data);
          this.librarianCount = data.data;
        } else {
          console.error('Error fetching users:', data);
        }
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  loadStaffCount(): void {
    this.apiService.getUsersCount('Staff').subscribe({
      next: (data) => {
        if (data.success) {
          console.log('Users:', data.data);
          this.staffCount = data.data;
        } else {
          console.error('Error fetching users:', data);
        }
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  loadUAssistantCount(): void {
    this.apiService.getUsersCount('Assistant').subscribe({
      next: (data) => {
        if (data.success) {
          console.log('Users:', data.data);
          this.assistantCount = data.data;
        } else {
          console.error('Error fetching users:', data);
        }
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  loadBooks(): void {
    this.apiService.getBooks().subscribe({
      next: (data) => {
        if (data.success && Array.isArray(data.data)) {
          console.log('Books:', data.data);
        } else {
          console.error('Error fetching books:', data);
        }
      },
      error: (err) => console.error('Error fetching books:', err),
    });
  }

  loadStaff(): void {
    // this.apiService.getStaff().subscribe({
    //   next: (data) => {
    //     if (data.success && Array.isArray(data.data)) {
    //       console.log('Staff:', data.data);
    //     } else {
    //       console.error('Error fetching staff:', data);
    //     }
    //   },
    //   error: (err) => console.error('Error fetching staff:', err),
    // });
  }
}
