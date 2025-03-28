import { Component, inject } from '@angular/core';
import { ICategory } from '../../shared/interfaces/icategory';
import { BrandsService } from '../../core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private readonly brandsService = inject(BrandsService)
  
    brands: ICategory[] = []
    ngOnInit(): void {
      this.brandsService.getAllBrands().subscribe({
        next: (res) => {
          console.log(res)
          this.brands = res.data;
        },
        error: (err) => {
          console.error('Error fetching brands:', err);
        }

        // TODO: Implement pagination and infinite scroll for better performance and user experience.
        // For pagination, use a library like ngx-pagination or implement your own logic.
        // For infinite scroll, use a library like ngx-infinite-scroll or implement your own logic.
        // Example:
        // this.brandsService.getAllBrands(this.currentPage, this.itemsPerPage).subscribe({
        //   next: (res) => {
        //     this.brands = [...this.brands,...res.data];
        //     this.currentPage++;
        //   },
        //   error: (err) => {
        //     console.error('Error fetching brands:', err);
        //   }
        // });
      })
    }
}
