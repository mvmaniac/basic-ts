interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// 1. 상품 목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product[]> {
  const products: Product[] = [
    {
      id: 1,
      name: '상품명',
      price: 1000,
      brand: '브랜드명',
      stock: 10,
    },
  ];

  return Promise.resolve(products);
}

// 2. 특정 상품의 상세 정보를 나타내기 위한 함수

// Product 속성의 일부만 가져옴
// interface ProductDetail {
//   id: number;
//   name: string;
//   price: number;
// }

// Product 속성의 일부만 가져온 인터페이스 사용
// function displayProductDetail(shoppingItem: ProductDetail) {}

// 유틸리티 함수 사용
type ShoppingItemPick = Pick<Product, 'id' | 'name' | 'price'>;

function displayProductDetail(
  shoppingItem: Pick<Product, 'id' | 'name' | 'price'>,
) {}

// 3. 특정 상품 정보를 업데이트(갱신)하는 함수
// Product 속성과 동일하지만 필수가 아님
// interface UpdateProduct {
//   id?: number;
//   name?: string;
//   price?: number;
//   brand?: string;
//   stock?: number;
// }

// UpdateProduct 인터페이스 사용
// function updateProductItem(productItem: UpdateProduct) {}

type UpdateProduct = Partial<Product>;

// 유틸리티 함수 사용, Product 속성의 값이 모두 있을 필요가 없음
function updateProductItem(productItem: Partial<Product>) {}

// 4. 유틸리티 타입 구현하기 - Partial
interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}

// UserProfile 인터페이스를 Partial 처럼 써보기, #1 단순하게
interface UserProfileUpdate {
  username?: string;
  email?: string;
  profilePhotoUrl?: string;
}

// UserProfile 인터페이스를 Partial 처럼 써보기, #2 UserProfile 속성의 타입을 재사용
type UserProfileUpdate1 = {
  username?: UserProfile['username'];
  email?: UserProfile['email'];
  profilePhotoUrl?: UserProfile['profilePhotoUrl'];
};

// UserProfile 인터페이스를 Partial 처럼 써보기, #3 in 구문으로 반복문 사용
type UserProfileUpdate21 = {
  [p in 'username' | 'email' | 'profilePhotoUrl']?: UserProfile[p];
};

// 'username' | 'email' | 'profilePhotoUrl' 와 같음
type UserProfileKeys = keyof UserProfile;

// UserProfile 인터페이스를 Partial 처럼 써보기, #4 keyof 사용
type UserProfileUpdate22 = {
  [p in keyof UserProfile]?: UserProfile[p];
};

// UserProfile 인터페이스를 Partial 처럼 써보기, #5 제네릭 사용
type Subset<T> = {
  [p in keyof T]?: T[p];
};
