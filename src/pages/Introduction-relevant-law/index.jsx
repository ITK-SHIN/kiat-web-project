import { Link } from "react-router-dom";
import overviewImage from "../../assets/images/law2.png";

export default function IntroductionRelevantLaw() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 상단 네비게이션 */}
        <div className="bg-white border-b mb-8 -mx-4 px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">🏠</Link>
            <span>&gt;</span>
            <span className="text-gray-900">제도소개</span>
            <span>&gt;</span>
            <span className="text-gray-900 font-medium">관련법령</span>
          </nav>
        </div>

        {/* 이미지 컨테이너 */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <img 
            src={overviewImage} 
            alt="첨단산업 인재혁신 특별법 관련법령" 
            className="w-full h-auto rounded-lg"
          />
        </div>

      </div>
    </div>
  );
}
